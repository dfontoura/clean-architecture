import Coupon from "../entity/coupon";

export default interface CouponRepository {
    getByName(name: string): Coupon | undefined;
}
