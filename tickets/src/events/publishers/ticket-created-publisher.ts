import { Publisher, Subjects, TicketCreatedEvent } from "@sajal-micro-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}