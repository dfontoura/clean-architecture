
const { validateCPF } = require('./cpf');

exports.createOrder = function (userCpf, orderData, discountCoupon) {
    const { isValid, errorMessages } = validateParams(userCpf, orderData, discountCoupon)
    if (!isValid) {
        return {
            isValid: false,
            errorMessages 
        };
    }

    const orderSummary = getOrderSummary(userCpf, orderData, discountCoupon);
    successMessage = getSuccessMessage(orderSummary);

    return {
        isValid: true,
        price: orderSummary.priceWithDiscount,
        successMessage,
        errorMessages
    }
}

const validateParams = function (userCpf, orderData, discountCoupon) {
    const isValidCpf = validateCPF(userCpf);
    const isValidOrderData = validateOrderData(orderData);
    const isValidCoupon = validateCoupon(discountCoupon);

    const invalidParams = [];
    if (!isValidCpf) {
        invalidParams.push('CPF inválido');
    }
    if (!isValidOrderData) {
        invalidParams.push('Dados do pedido inválidos');
    }
    if (!isValidCoupon) {
        invalidParams.push('Cupom inválido');
    }

    return {
        isValid: invalidParams.length === 0,
        errorMessages: invalidParams
    };
}

const validateOrderData = function (orderData) {
    const isValid = orderData.every(item => {
        const isValidProductName = item.productName && item.productName.length > 0;
        const isValidProductDescription = item.productDescription && item.productDescription.length > 0;
        const isValidProductPrice = item.productPrice && item.productPrice > 0;
        const isValidProductQuantity = item.productQuantity && item.productQuantity > 0;

        return (isValidProductName && isValidProductDescription && isValidProductPrice && isValidProductQuantity);
    });

    return isValid;
}

const validateCoupon = function (discountCoupon) {
    if (discountCoupon) {
        return !Number.isNaN(discountCoupon);    
    }
    return true;
}

const getOrderSummary = function (userCpf, orderData, discountCoupon) {
    const itemsQuantity = orderData.reduce((sum, currentItem) => sum + currentItem.productQuantity, 0);
    const totalPrice = orderData.reduce((sum, currentItem) => sum + (currentItem.productPrice * currentItem.productQuantity), 0);
    const priceWithDiscount = calculatePriceWithDiscount(totalPrice, discountCoupon);

    return {
        userCpf, 
        itemsQuantity,
        totalPrice,
        priceWithDiscount,
        Discount: discountCoupon
    }
}

const calculatePriceWithDiscount = function (totalPrice, discountCoupon) {
    return discountValue = totalPrice - (totalPrice * discountCoupon);
}

const getSuccessMessage = function (orderSummary) {
    return `
        Pedido criado com sucesso!
        Dados do pedido:
        Quantidade de items: ${orderSummary.itemsQuantity}
        alor total: R$ ${orderSummary.totalPrice}
        Desconto de ${100 * orderSummary.Discount}% aplicado
        Valor com desconto: R$ ${orderSummary.priceWithDiscount}
    `;
}
