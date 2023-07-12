import { Publisher, Subjects, TicketUpdatedEvent } from "@sajal-micro-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}