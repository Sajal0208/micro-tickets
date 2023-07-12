import { Subjects, Publisher, OrderCancelledEvent } from "@sajal-micro-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}