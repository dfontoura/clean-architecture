import Handler from "../../application/handler/handler";
import DomainEvent from "../../domain/event/domainEvent";

export default class Mediator {
    handlers: Handler[];

    constructor () {
        this.handlers = [];
    }

    register (handler: Handler) {
        this.handlers.push(handler);
    }

    async publish (event: DomainEvent) {
        for (const handler of this.handlers) {
            if (handler.name === event.name) {
                await handler.handle(event);
            }
        }
    }
}