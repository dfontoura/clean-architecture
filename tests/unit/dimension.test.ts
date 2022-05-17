import Dimension from '../../src/domain/entity/dimension';

test('Should create dimensions of an item', () => {
    const dimension = new Dimension(100, 30, 10, 'cm');
    const volume = dimension.getVolume('m');
    expect(volume).toBe(1.00 * 0.30 * 0.10);
});
