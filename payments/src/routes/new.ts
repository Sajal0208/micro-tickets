import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from "@sajal-micro-tickets/common";
import { Order } from "../models/order";
import { OrderStatus } from "@sajal-micro-tickets/common";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/payments/create-payment-intent',
    requireAuth,
    async (req: Request, res: Response) => {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        try {
            const payment_intent = await stripe.paymentIntents.create({
                currency: 'inr',
                amount: order.price * 100,
                description: 'Ticketing App Payment',
            });

           
            res.status(201).send({
                clientSecret: payment_intent.client_secret
            });
        } catch (e: any) {
            throw new BadRequestError('Payment failed: ' + e.message);
        }
    }
)

router.post('/api/payments',
    requireAuth,
    [
        body('orderId').not().isEmpty()
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        console.log('order: ', order);

        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for a cancelled order');
        }

        const payment = Payment.build({
            orderId,
        });

        await payment.save();

        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId,
        })
    }
);

export { router as createChargeRouter };