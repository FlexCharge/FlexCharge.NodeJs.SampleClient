import express from 'express';
import PingController from '../controllers/ping';
import { SampleEvaluateController } from '../controllers/SampleEvaluateController';
import { SampleTransmitController } from '../controllers/SampleTransmitController';
import { SampleOutcomeController } from '../controllers/SampleOutcomeController';
import { SampleRefundController } from '../controllers/SampleRefundController';

const router = express.Router();

router.get('/ping', async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get('/evaluate', async (_req, res) => {
  const controller = new SampleEvaluateController();
  const response = await controller.get(
    _req.query.publicKey as string,
    _req.query.secretKey as string,
    _req.query.tokenizedCardNumber as string,
  );
  return res.send(response);
});

router.get('/evaluate/mit', async (_req, res) => {
  const controller = new SampleEvaluateController();
  const response = await controller.getMIT(
    _req.query.publicKey as string,
    _req.query.secretKey as string,
    _req.query.tokenizedCardNumber as string,
  );
  return res.send(response);
});

router.get('/evaluate/mit-recurring', async (_req, res) => {
  const controller = new SampleEvaluateController();
  const response = await controller.getMITRecurring(
    _req.query.publicKey as string,
    _req.query.secretKey as string,
    _req.query.tokenizedCardNumber as string,
  );
  return res.send(response);
});

router.get('/transmit', async (_req, res) => {
  const controller = new SampleTransmitController();
  const response = await controller.simulateTransmit(
    _req.query.publicKey as string,
    _req.query.secretKey as string,
  );
  return res.send(response);
});

router.get('/outcome', async (_req, res) => {
  const controller = new SampleOutcomeController();
  const response = await controller.simulateOutcome(
    _req.query.publicKey as string,
    _req.query.secretKey as string,
  );
  return res.send(response);
});

router.get('/refund', async (_req, res) => {
  const controller = new SampleRefundController();
  const response = await controller.simulateRefund(
    _req.query.publicKey as string,
    _req.query.secretKey as string,
  );
  return res.send(response);
});

export default router;
