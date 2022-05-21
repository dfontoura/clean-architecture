import CouponRepository from '../../../domain/repository/coupon-repository';

export default class ValidateCoupon {
    constructor(readonly couponRepository: CouponRepository) {
    }
    
    execute(couponCode: string): boolean {
        const coupon = this.couponRepository.getByCode(couponCode);

        if (!coupon) {
            return false;
        }

        const isExpired = coupon.isExpired();
        return !isExpired;
    }
}