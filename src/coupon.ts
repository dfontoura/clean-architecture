export default class Coupon {
    constructor(readonly name: string, readonly percentage: number, readonly expirationDate?: Date) {
        if(!name || !percentage || percentage < 0 || percentage > 100) {
            throw new Error('Invalid parameters');
        }
    }

    public getDiscount(total: number):  number  {
        if (this.isExpired()) {
            return 0;
        };
        return total * (this.percentage / 100);
    }

    public isExpired(today: Date = new Date()): boolean {
        if  (!this.expirationDate) {
            return false;
        }
        return this.expirationDate.getTime() < today.getTime()
    }
}