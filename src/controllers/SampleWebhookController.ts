import { Controller, Route, Tags, Body, Get } from 'tsoa';
import crypto from 'crypto';

@Route('webhook')
@Tags('Webhook')
export class SampleWebhookController extends Controller {
  @Get('/')
  public async handleWebhook(): Promise<string> {
    // Mock payload
    const payload =
      '{"Event":"order.completed","TimeStamp":"2023-03-20T17:16:40.898703Z","EventData":null,"ExternalOrderId":"a9735210-1349-49bf-bfde-b737dd07872a","OrderId":"ac9674ed-cbfe-49aa-bc8b-eb1d2b74c429","ConfirmationId":"22ACD1D9","IsTestMode":true,"IsResent":false}';

    // Mock headers
    const headers = {
      'Content-Type': 'application/json',
      Host: 'fctestwebhook.free.beeceptor.com',
      'x-fc-authorization':
        'HMAC-SHA512 SignedHeaders=x-fc-nonce;x-fc-date;host;x-fc-content-sha512&Signature=+HXN8ZewgINLk+uC/UI92HSWmLK7gZOECPxOGEM91ATyfyzScMF/+osEK5B0UjO7OFqahDvesSo8jmUWMZtQnA==',
      'x-fc-content-sha512':
        'pLs0Op5VWqQM3ZIumqC2NP6MDqcnwFN1znp/oCuw9LcYd8PtvLC8ProyPg8ZDadsRc36NskT3QGKn/PkNqwWfg==',
      'x-fc-date': 'Mon, 20 Mar 2023 17:16:40 GMT',
      'x-fc-nonce': '5f1c2de28a76457c9cb79d1740f2260a',
      'x-fc-signature':
        'SbzcEwAKsViWqrB8+suZMjOdadswbUjLHtIKjDQJYle31xbB8Vr0pVTDaNP28/y+NDynpyFyKKnXmWZy8uJVig==',
      'content-length': '255',
    };

    // Merchant's Webhook endpoint host
    const host = 'fctestwebhook.free.beeceptor.com';

    // From FlexCharge Merchant Portal
    const subscriberKey =
      'XRmKBxG5uvt1qWzqvp+T6CAbTo0MB89GTxXZD5cHA56RP7Mj4NbnHQOR1Y8uorUU9YQz8ujaVRUdm9vTSkPZSw==';

    const result = ValidateWebhook(payload, headers, subscriberKey, host);
    return result;
  }
}

export function ComputeContentHash(payload: string): string {
  const hash = crypto.createHash('sha512');
  hash.write(payload);
  hash.end();
  return hash.read().toString('base64');
}

export function ComputeSignature(secret: string, payload: string): string {
  const hash = crypto.createHash('sha512');

  const secretByteArray = Buffer.from(secret, 'base64');

  const hmac = crypto.createHmac('sha512', secretByteArray);
  hmac.write(payload);
  hmac.end();
  return hmac.read().toString('base64');
}

export function ComputeWebhookSignature(
  secret: string,
  host: string,
  content: string,
  nonce: string,
  date: string,
): string {
  const contentHash = exports.ComputeContentHash(content);
  const toSign = 'POST\n' + nonce + ';' + date + ';' + host + ';' + contentHash;

  return exports.ComputeSignature(secret, toSign);
}

export function ValidateWebhook(
  payload: string,
  headers: {
    'content-length': string;
    'x-fc-authorization': string;
    'x-fc-signature': string;
    'x-fc-date': string;
    'x-fc-content-sha512': string;
    'x-fc-nonce': string;
    Host: string;
    'Content-Type': string;
  },
  subscriberKey: string,
  host: string,
): string {
  //"x-fc-nonce" header
  const nonce = headers['x-fc-nonce'];

  //"x-fc-date" header
  const date = headers['x-fc-date'];

  //from "x-fc-authorization" header
  const flexChargeAuthorization = headers['x-fc-authorization'];

  // Extracting signature from x-fc-authorization header
  const signature = flexChargeAuthorization.substr(
    flexChargeAuthorization.indexOf('Signature=') + 10,
  );

  // Calculating signature
  const recalculatedSignature = exports.ComputeWebhookSignature(
    subscriberKey,
    host,
    payload,
    nonce,
    date,
  );

  const verified = recalculatedSignature == signature;

  console.log(`Signature verification result: ${verified}`);

  return `Signature verification result: ${verified}`;
}
