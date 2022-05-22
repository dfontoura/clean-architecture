import CouponRepository from "../../src/domain/repository/coupon-repository";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/coupon-repository-database";

let connection: Connection;
let couponRepository: CouponRepository;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    couponRepository = new CouponRepositoryDatabase(connection);
});

test('Should get a coupon from database', async () => {
    const coupon = await couponRepository.getByCode('VALE20');
    expect(coupon?.getPercentage()).toBe(20);
});

afterEach(async () => {
    await connection.close();
});