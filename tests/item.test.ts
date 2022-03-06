import Item from "../src/item";

describe('Happy paths:', () => {
    test('Shipping price greater than minimum: should return the calculated shipping price',  () => {
        const item = new Item({
            id: 1,
            category: 'Musical Instruments',
            description: 'Guitar',
            price: 300,
            height: 10,
            width: 30,
            depth: 100,
            weight: 3
        });

        const distance = 1000;
        expect(item.getShipping(distance)).toBe(30);
    });

    test('Shipping cost less than minimum: should return the minimum shipping price',  () => {
        const item = new Item({
            id: 1,
            category: 'Accessories',
            description: 'cable',
            price: 100,
            height: 5,
            width: 20,
            depth: 20,
            weight: 0.5
        });

        const distance = 1000;
        expect(item.getShipping(distance)).toBe(10);
    });
});