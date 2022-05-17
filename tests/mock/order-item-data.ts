import Item from '../../src/domain/entity/item';
import { ITEM_DATA } from './item-data';

const { guitar, amplifier, cable } = ITEM_DATA;

export const ORDER_ITEM_DATA = [
    {
        item: new Item(guitar),
        quantity: 1
    },
    {
        item: new Item(amplifier),
        quantity: 1
    },
    {
        item: new Item(cable),
        quantity: 3
    }
]