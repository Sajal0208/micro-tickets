import { Subjects, Publisher, PaymentCreatedEvent } from "@sajal-micro-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    
}