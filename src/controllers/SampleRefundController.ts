import { Controller, Get, Query, Route, Tags } from 'tsoa';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { RefundRequest } from '../models';
import { RefundResult } from '../models';
import { JsonWebToken } from '../interfaces/json-web-token';
import {
  authenticate,
  creatEvaluateRequest,
  executeEvaluate,
} from '../helpers/evaluate-helper';
import { baseUrl } from '../constants/api';

@Route('refund')
@Tags('SampleRefund')
export class SampleRefundController extends Controller {
  @Get('')
  public async simulateRefund(
    @Query() publicKey: string,
    @Query() secretKey: string,
  ): Promise<RefundResult> {
    try {
      // Get bearer token
      const token = await authenticate(publicKey, secretKey);

      const evaluateBody = creatEvaluateRequest('4111111111111111');

      // Invoke evaluate
      const evaluateResponse = await executeEvaluate(token, evaluateBody);

      // Generate refund information model
      const refundBody = this.dummyRefundModel();

      // Invoke refund
      const refundResponse = await this.executeRefund(
        token,
        refundBody,
        evaluateResponse?.orderSessionKey,
      );

      return refundResponse;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return e;
    }
  }

  private async executeRefund(
    token: JsonWebToken,
    refundBody: RefundRequest,
    id?: string | null,
  ): Promise<RefundResult> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}/orders/${id}/refund`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
      data: refundBody,
    };

    const response: AxiosResponse = await axios<RefundResult>(config);
    return response.data;
  }

  private dummyRefundModel(): RefundRequest {
    return {
      amountToRefund: 0,
      isPartialRefund: true,
    };
  }
}
