import Coupon from "../entity/coupon";

export default interface CouponRepository {
    getByCode(name: string): Promise<Coupon | undefined>;
}
