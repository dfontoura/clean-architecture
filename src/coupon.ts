export default class Coupon {
    private name: string;
    private percentage: number;

    constructor(name: string, percentage: number) {
        if(!name || !percentage || percentage < 0 || percentage > 100) {
            throw new Error('Invalid parameters');
        }

        this.name = name;
        this.percentage = percentage;
    }

    public getDiscount(total: number):  number  {
        return total * (this.percentage / 100);
    }
}