import ValidateCoupon from "../../src/application/use-cases/validate-coupon/validate-coupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/coupon-repository-memory";

describe('Happy path:', () => {
    test('Should validate a valid coupon', () => {
        const couponRepository = new CouponRepositoryMemory();
        const validateCoupon = new ValidateCoupon(couponRepository);
        const isValid = validateCoupon.execute('COUPON20');
        expect(isValid).toBeTruthy();
    });
});

describe('Exception path:', () => {
    test('Should invalidate an invalid coupon', () => {
        const couponRepository = new CouponRepositoryMemory();
        const validateCoupon = new ValidateCoupon(couponRepository);
        const isValid = validateCoupon.execute('not_a_valid_coupon');
        expect(isValid).toBeFalsy();
    });

    test('Should invalidate an expired coupon', () => {
        const couponRepository = new CouponRepositoryMemory();
        const validateCoupon = new ValidateCoupon(couponRepository);
        const isValid = validateCoupon.execute('EXPIRABLE');
        expect(isValid).toBeFalsy();
    });
});