import Coupon from "../../../domain/entity/coupon";
import CouponRepository from "../../../domain/repository/coupon-repository";

export default class CouponRepositoryMemory implements CouponRepository {
    private coupons: Coupon[];

    constructor () {
        this.coupons = [
            new Coupon('COUPON20', 20),
            new Coupon('COUPON10', 10),
            new Coupon('COUPON5', 5),
            new Coupon('EXPIRABLE', 5, new Date('2021-05-01T23:59:59')),
        ];
    }

    getByCode(name: string): Coupon | undefined {
        return this.coupons.find(coupon => coupon.getName() === name);
    }
}