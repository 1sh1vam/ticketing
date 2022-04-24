import { ExpirationCompleteEvent, Publisher, Subjects } from "@simtix/ticketing-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}