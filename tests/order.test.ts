const { createOrder } = require('../src/order');

test("Should return false if the invalid CPF's is provided", () => {
    const invalidCpf = '123.123.123-12';
    const  isValid = createOrder(invalidCpf, [], '');
    expect(isValid).toBe(false);
});

test("Should return false if orderData is invalid", () => {
    const validCpf = '054.348.866-74';
    const invalidOrderData = [
        {
            productName: 'Teste', 
            productPrice: 1000, 
            productQuantity: -15, 
            productDescription: 'Descrição de teste' 
        }
    ];

    const  isValid = createOrder(validCpf, invalidOrderData);
    expect(isValid).toBe(false);
});

test("Should return the price with discount if everything is ok.", () => {
    const validCpf = '054.348.866-74';
    const validOrderData = [
        {
            productName: 'Teste', 
            productPrice: 1000, 
            productQuantity: 3, 
            productDescription: 'Descrição de teste' 
        }
    ];
    const validDiscoutCoupon = '0.10';

    const  isValid = createOrder(validCpf, validOrderData, validDiscoutCoupon);
    expect(isValid).toBe(2700);
});

test("Should return the price with discount if everything is ok with a order with more than one item.", () => {
    const validCpf = '054.348.866-74';
    const validOrderData = [
        {
            productName: 'Teste 1', 
            productPrice: 1000, 
            productQuantity: 1, 
            productDescription: 'Descrição de teste 1' 
        },
        {
            productName: 'Teste 2', 
            productPrice: 100, 
            productQuantity: 10, 
            productDescription: 'Descrição de teste 2' 
        },
        {
            productName: 'Teste 3', 
            productPrice: 10, 
            productQuantity: 100, 
            productDescription: 'Descrição de teste 3' 
        }
    ];
    const validDiscoutCoupon = '0.10';

    const  isValid = createOrder(validCpf, validOrderData, validDiscoutCoupon);
    expect(isValid).toBe(2700);
});
