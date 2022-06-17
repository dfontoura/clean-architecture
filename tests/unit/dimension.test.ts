import Dimension from '../../src/domain/entity/dimension';

describe('Happy paths:', () => {
    test('Should create dimensions of an item', () => {
        const dimension = new Dimension(100, 30, 10, 'cm');
        const volume = dimension.getVolume('m');
        expect(volume).toBe(1.00 * 0.30 * 0.10);
    });
});

describe('Exception paths:', () => {
    test('Should throw an error when any dimension is negative', () => {
        expect(() => new Dimension(100, -30, 10, 'cm')).toThrowError('Invalid parameter');
    });
});
