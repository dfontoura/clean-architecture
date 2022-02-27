
const { createOrder } = require('./order');

const cpf = "12345678809";

const orderData = [
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

const coupon = 0.20;

const result = createOrder(cpf, orderData, coupon);

if (result.isValid) {
    console.log(result.successMessage);
} else {
    result.errorMessages.forEach(errorMessage => console.log(errorMessage));
}
