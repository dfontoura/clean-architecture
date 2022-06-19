export default class StockEntry {

    constructor (readonly itemId: number, readonly operation: string, readonly quantity: number) {
    }

    getOperation(): string {
        return this.operation;
    }
}