import { Controller, Get, Query, Route, Tags } from 'tsoa';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { OutcomeRequest } from '../models';
import { OutcomeResponse } from '../models';
import { JsonWebToken } from '../interfaces/json-web-token';
import {
  authenticate,
  creatEvaluateRequest,
  executeEvaluate,
} from '../helpers/evaluate-helper';
import { baseUrl } from '../constants/api';

@Route('outcome')
@Tags('SampleOutcome')
export class SampleOutcomeController extends Controller {
  @Get('')
  async simulateOutcome(
    @Query() publicKey: string,
    @Query() secretKey: string,
  ): Promise<OutcomeResponse> {
    try {
      //get bearer token
      const token = await authenticate(publicKey, secretKey);

      const evaluateBody = creatEvaluateRequest('4111111111111111');

      // Invoke evaluate
      const evaluateResponse = await executeEvaluate(token, evaluateBody);

      // Generate outcome information model
      const outcomeBody = this.dummyOutcomeModel(
        evaluateResponse?.orderSessionKey,
      );

      // Invoke outcome
      const outcomeResponse = await this.executeOutcome(token, outcomeBody);

      return outcomeResponse;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return e;
    }
  }

  private async executeOutcome(
    token: JsonWebToken,
    outcomeBody: OutcomeRequest,
  ): Promise<OutcomeResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}/outcome`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
      data: outcomeBody,
    };

    const response: AxiosResponse = await axios<OutcomeResponse>(config);
    return response.data;
  }

  private dummyOutcomeModel(
    orderSessionKey: string | undefined | null,
  ): OutcomeRequest {
    return {
      orderSessionKey,
    };
  }
}
