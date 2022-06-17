import Item from '../../src/domain/entity/item';
import { ITEM_DATA } from '../mock/item-data';

const { guitar, cable } = ITEM_DATA;

describe('Happy paths:', () => {
    test('Should create an item with dimensions and calculate volume', () => {
        const item = new Item(guitar);
        const itemVolume = item.getVolume('m');        
        expect(itemVolume).toBe(0.15 * 0.50 * 1.00);
    });

    test('Should create an item with dimensions and calculate density', () => {
        const item = new Item(guitar);
        const itemVolume = item.getVolume('m');
        const itemDensity = item.getWeight() / itemVolume;
        expect(itemDensity).toBe(3 / (0.15 * 0.50 * 1.00));
    });
});

describe('Exception paths:', () => {
    test('Should throw an error when weight is negative', () => {
        const itemData = guitar;
        itemData.weight *= -1;
        expect(() => new Item(itemData)).toThrowError('Invalid parameter');
        itemData.weight *= -1;
    });
});