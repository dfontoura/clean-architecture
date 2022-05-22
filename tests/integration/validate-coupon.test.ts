import ValidateCoupon from "../../src/application/use-cases/validate-coupon/validate-coupon";
import CouponRepository from "../../src/domain/repository/coupon-repository";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/coupon-repository-database";
import CouponRepositoryMemory from "../../src/infra/repository/memory/coupon-repository-memory";

let connection: Connection;
let couponRepository: CouponRepository;
let validateCoupon: ValidateCoupon;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    couponRepository = new CouponRepositoryDatabase(connection);
    validateCoupon = new ValidateCoupon(couponRepository);
});

describe('Happy path:', () => {
    test('Should validate a valid coupon', async () => {
        const isValid = await validateCoupon.execute('VALE20');
        expect(isValid).toBeTruthy();
    });
});

describe('Exception path:', () => {
    test('Should invalidate an invalid coupon', async () => {
        const isValid = await validateCoupon.execute('not_a_valid_coupon');
        expect(isValid).toBeFalsy();
    });

    test('Should invalidate an expired coupon', async () => {
        const isValid = await validateCoupon.execute('EXPIRABLE');
        expect(isValid).toBeFalsy();
    });
});

afterEach(async () => {
    await connection.close();
});
