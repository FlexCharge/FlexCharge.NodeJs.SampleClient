import axios, { AxiosResponse } from 'axios';
import { generateGUID } from './guyd';
import { JsonWebToken } from '../interfaces/json-web-token';
import { EvaluateResponse, EvaluateRequest } from '../models';
import { baseUrl } from '../constants/api';

interface AuthenticateRequest {
  appKey: string;
  appSecret: string;
}

export async function authenticate(
  publicKey: string,
  secretKey: string,
): Promise<JsonWebToken> {
  const body: AuthenticateRequest = {
    appKey: publicKey,
    appSecret: secretKey,
  };

  const response: AxiosResponse = await axios.post<JsonWebToken>(
    baseUrl + 'oauth2/token',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  console.log(response, body);

  return response.data;
}

// export interface EvaluateResponse {
//   result: number;
// }

export async function executeEvaluate(
  token: JsonWebToken,
  body: EvaluateRequest,
): Promise<EvaluateResponse> {
  const response: AxiosResponse = await axios.post<EvaluateResponse>(
    baseUrl + 'evaluate',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.accessToken,
      },
    },
  );

  return response.data;
}

export function creatEvaluateRequest(
  tokenizedCardNumber: string,
): EvaluateRequest {
  const transmitBody: EvaluateRequest = {
    idempotencyKey: generateGUID(),
    isDeclined: true,
    mid: null,
    orderId: 'order-' + generateGUID(),
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
      cardNumber: tokenizedCardNumber,
      cardBinNumber: tokenizedCardNumber.substring(0, 5),
      cardLast4Digits: tokenizedCardNumber.substring(
        tokenizedCardNumber.length - 4,
      ),
    },
  };
  return transmitBody;
}
