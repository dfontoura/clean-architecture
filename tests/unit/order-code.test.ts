import OrderCode from "../../src/domain/entity/order-code";

test('Deve criar o código do pedido', () => {
    const date = new Date('2022-03-17T23:29:00');
    const sequence = 1;
    const orderCode = new OrderCode(date, sequence);
    const code = orderCode.value;

    expect(code).toBe('202200000001');
})