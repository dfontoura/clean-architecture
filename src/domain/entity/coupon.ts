export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {
        if(!code || !percentage || percentage < 0 || percentage > 100) {
            throw new Error('Invalid parameters');
        }
    }

    public getDiscount(total: number):  number  {
        if (this.isExpired()) {
            return 0;
        };

        return total * (this.percentage / 100);
    }

    public getPercentage(): number {
        return this.percentage;
    }

    public getCode(): string {
        return this.code;
    }

    public isExpired(today: Date = new Date()): boolean {
        if  (!this.expirationDate) {
            return false;
        }

        return this.expirationDate.getTime() < today.getTime()
    }
}