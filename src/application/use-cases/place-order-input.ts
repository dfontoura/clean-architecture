export default class PlaceOrderInput {

    constructor (
        readonly cpf: string, 
        readonly orderItems: {itemId: number, quantity: number}[], 
        readonly couponId?: string, 
        readonly issueDate: Date = new Date()) {
    }
}