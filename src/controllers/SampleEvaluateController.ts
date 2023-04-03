import {
  executeEvaluate,
  authenticate,
  creatEvaluateRequest,
} from '../helpers/evaluate-helper';
import { Get, Route, Controller, Query, Path, Tags } from 'tsoa';
import { EvaluateResponse, EvaluateRequest } from '../models';

@Route('evaluate')
@Tags('SampleEvaluate')
export class SampleEvaluateController extends Controller {
  @Get('')
  public async get(
    @Query() publicKey: string,
    @Query() secretKey: string,
    @Query() tokenizedCardNumber: string,
  ): Promise<EvaluateResponse> {
    try {
      //get bearer token
      const token = await authenticate(publicKey, secretKey);

      //Generate evaluate information
      const evaluateBody = creatEvaluateRequest(tokenizedCardNumber);

      //Invoke evaluate
      const evaluateResponse = await executeEvaluate(token, evaluateBody);

      return evaluateResponse;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return e;
    }
  }

  @Get('/mit')
  public async getMIT(
    @Query() publicKey: string,
    @Query() secretKey: string,
    @Query() tokenizedCardNumber: string,
  ): Promise<EvaluateResponse> {
    try {
      //get bearer token
      const token = await authenticate(publicKey, secretKey);

      //Generate evaluate information
      const evaluateBody = creatEvaluateRequest(tokenizedCardNumber);

      evaluateBody.isMIT = true;
      evaluateBody.isRecurring = false;
      evaluateBody.expiryDateUtc = new Date().toUTCString();
      evaluateBody.subscription = null;

      //Invoke transmit
      const evaluateResponse = await executeEvaluate(token, evaluateBody);

      return evaluateResponse;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return e;
    }
  }

  @Get('/mit-recurring')
  public async getMITRecurring(
    @Query() publicKey: string,
    @Query() secretKey: string,
    @Query() tokenizedCardNumber: string,
  ): Promise<EvaluateResponse> {
    try {
      //get bearer token
      const token = await authenticate(publicKey, secretKey);

      //Generate evaluate information
      const evaluateBody = creatEvaluateRequest(tokenizedCardNumber);

      evaluateBody.isMIT = true;
      evaluateBody.isRecurring = true;
      evaluateBody.expiryDateUtc = new Date().toUTCString();
      evaluateBody.subscription = {
        subscriptionId: new Date().getTime().toString(),
        interval: 'monthly',
        price: '100',
        currency: 'USD',
      };

      //Invoke transmit
      const evaluateResponse = await executeEvaluate(token, evaluateBody);

      return evaluateResponse;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return e;
    }
  }
}
