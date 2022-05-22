import Coupon from "../entity/coupon";

export default interface CouponRepository {
    getByCode(name: string): Coupon | undefined;
}
