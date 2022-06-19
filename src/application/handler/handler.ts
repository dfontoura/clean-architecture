import DomainEvent from "../../domain/event/domainEvent";

export default interface Handler {
    name: string;
    handle (event: DomainEvent): Promise<void>;
}