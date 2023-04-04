export interface WebhookPayload {
  event: string;
  timeStamp: Date;
  eventData?: any;
  externalOrderId: string;
  orderId: string;
  confirmationId?: string;
  isTestMode: boolean;
  isResent: boolean;
}
