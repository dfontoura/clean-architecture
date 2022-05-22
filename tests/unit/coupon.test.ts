import Coupon from "../../src/domain/entity/coupon";

describe('Happy path:', () => {
    test('Should create a new coupon', () => {
        const coupon = new Coupon('VALE-10', 10, new Date('2099-12-31'));
        expect(coupon.isExpired()).toBeFalsy();
    });

    test('Should create an expired coupon', () => {
        const coupon = new Coupon('VALE-10', 10, new Date('2020-12-31'));
        expect(coupon.isExpired(new Date('2021-12-31'))).toBeTruthy();
    });

    test('Should create a valid coupon and calculate the discount', () => {
        const coupon = new Coupon('VALE-10', 10);
        expect(coupon.getDiscount(200)).toBe(20);
    });
});
