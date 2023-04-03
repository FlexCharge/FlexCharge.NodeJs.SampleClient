import { Controller, Route, Tags, Get, Query } from 'tsoa';

import { TransmitRequest, TransmitResponse } from '../models';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { baseUrl } from '../constants/api';

import {
  executeEvaluate,
  authenticate,
  creatEvaluateRequest,
} from '../helpers/evaluate-helper';

@Route('transmit')
@Tags('SampleTransmit')
export class SampleTransmitController extends Controller {
  @Get('')
  public async simulateTransmit(
    @Query() publicKey: string,
    @Query() secretKey: string,
  ): Promise<TransmitResponse> {
    try {
      console.log('simulateTransmit++++++');
      //get bearer token
      const token = await authenticate(publicKey, secretKey);

      console.log('token---', token);

      //Generate transmit information model
      const transmitBody = this.dummyTransmitModel();

      console.log('transmitBody---', transmitBody);

      //Invoke transmit
      const transmitResponse = await this.executeTransmit(token, transmitBody);

      return transmitResponse;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return error;
    }
  }

  private async executeTransmit(
    token: any,
    transmitBody: TransmitRequest,
  ): Promise<TransmitResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}transmit`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
      data: transmitBody,
    };
    console.log('config---', config);
    const response = await axios<TransmitResponse>(config);
    return response.data;
  }

  private dummyTransmitModel(): TransmitRequest {
    const transmitBody = {
      isDeclined: false,
      mid: null,
      orderId: 'ORD-12345',
      orderSource: 'Site1',
      transaction: {
        id: 'TRX-12345',
        timestampUtc: new Date().toISOString(),
        timezoneUtcOffset: 0,
        transactionType: 'Credit',
        amount: 100,
        currency: 'USD',
        responseCode: '100',
        responseDescription: 'Approved',
        responseStatus: 'Approved',
        responseSubStatus: null,
        responseCodeSource: 'Gateway',
        processorName: 'ProcessorName',
        avsResultCode: 'M',
        cvvResultCode: 'M',
        cavvResultCode: 'Y',
        cardNotPresent: true,
      },
      payer: {
        id: 'PAYER-12345',
        birthdate: null,
        email: 'test@email.com',
        phone: '1234567890',
      },
      orderItems: [
        {
          sku: 'SKU-12345',
          name: 'Test Item',
          description: 'Test Item Description',
          amount: 100,
          discountAmount: 0,
          tax: 0,
          discountType: null,
          quantity: 1,
        },
      ],
      billingInformation: {
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        country: 'US',
        countryCode: 'US',
        addressLine1: '123 Main St',
        addressLine2: null,
        state: 'CA',
        city: 'Los Angeles',
        zipcode: '90001',
      },
      shippingInformation: {
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        country: 'US',
        countryCode: 'US',
        addressLine1: '123 Main St',
        addressLine2: null,
        state: 'CA',
        city: 'Los Angeles',
        zipcode: '90001',
      },
      paymentMethod: {
        holderName: 'Test User',
        cardType: 'Credit',
        cardBrand: 'Visa',
        cardCountry: 'US',
        cardIssuer: 'J.p. Morgan Chase Bank, N.A.',
        cardLevel: 'Platinum',
        cardFingerprint: 'YourFingerprint',
        expirationMonth: 9,
        expirationYear: 2025,
        cardBinNumber: '411111',
        cardLast4Digits: '1111',
      },
      isMIT: false,
      isRecurring: false,
      subscription: null,
      additionalFields: null,
      merchant: null,
    };

    return transmitBody;
  }
}
