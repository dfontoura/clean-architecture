export default class Coupon {
    private name: string;
    private percentage: number;
    private expirationDate: Date;

    constructor(name: string, percentage: number, expirationDate: Date) {
        if(!name || !percentage || percentage < 0 || percentage > 100 || !expirationDate) {
            throw new Error('Invalid parameters');
        }

        this.name = name;
        this.percentage = percentage;
        this.expirationDate = expirationDate;
    }

    public getDiscount(total: number):  number  {
        return total * (this.percentage / 100);
    }

    public isValid(): boolean {
        if (this.expirationDate < new Date()) {
            return false;
        }
        return true;
    }
}