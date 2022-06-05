import Dimension from "../../../domain/entity/dimension";
import Item from "../../../domain/entity/item";
import ItemRepository from "../../../domain/repository/item-repository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[];

    constructor () {
        this.items = [
            new Item(itemData.guitar),
            new Item(itemData.amplifier),
            new Item(itemData.cable),
        ];
    }

    async getById (id: number): Promise<Item | undefined> {
        return this.items.find(item => item.getId() === id);
    }
}

const itemData = {
    guitar: {
        id: 1,
        category: 'Musical Instruments',
        description: 'Guitar',
        price: 1000,
        dimensions: new Dimension(100, 50, 15, 'cm'),
        weight: 3
    },

    amplifier: {
        id: 2,
        category: 'Musical Instruments',
        description: 'Amplifier',
        price: 5000,
        dimensions: new Dimension(50, 50, 50, 'cm'),
        weight: 22
    },

    cable: {
        id: 3,
        category: 'Accessories',
        description: 'Cable',
        price: 30,
        dimensions: new Dimension(10, 10, 10, 'cm'),
        weight: 1
    }
};