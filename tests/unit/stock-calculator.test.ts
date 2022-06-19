import StockEntry from "../../src/domain/entity/stock-entry";
import StockCalculator from "../../src/domain/service/stock-calculator";

test('Should calculate the stock of an item', () => {
    const calculator = new StockCalculator();

    const stockEntries = [
        new StockEntry(1, 'in', 6),
        new StockEntry(1, 'out', 2),
        new StockEntry(1, 'in', 2)
    ];
    
    const total = calculator.calculate(stockEntries);
    expect(total).toBe(6);
});