import { Publisher, OrderCreatedEvent, Subjects } from "@sajal-micro-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}  