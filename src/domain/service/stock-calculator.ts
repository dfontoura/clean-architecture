import StockEntry from "../entity/stock-entry";

export default class StockCalculator {

    calculate (stockEntries: StockEntry[]) {
        let total = 0;

        for (const stockEntry of stockEntries) {
            if (stockEntry.getOperation() === 'in') {
                total += stockEntry.quantity;
            }

            if (stockEntry.getOperation() === 'out') {
                total -= stockEntry.quantity;
            }
        }

        return total;
    }
}