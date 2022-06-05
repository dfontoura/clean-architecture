import Dimension from "../../src/domain/entity/dimension";

export const ITEM_DATA = {
    guitar: {
        id: 1,
        category: 'Musical Instruments',
        description: 'Guitar',
        price: 1000,
        dimensions: new Dimension(10, 30, 100, 'cm'),
        weight: 3
    },

    amplifier: {
        id: 2,
        category: 'Musical Instruments',
        description: 'Amplifier',
        price: 5000,
        dimensions: new Dimension(100, 50, 50, 'cm'),
        weight: 20
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
