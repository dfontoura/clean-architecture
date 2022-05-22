import Coupon from "../../../domain/entity/coupon";
import Connection from "../../database/connection";

export default class CouponRepositoryDatabase implements CouponRepositoryDatabase {
    constructor(readonly connection: Connection) {
    }

    async getByCode(couponCode: string): Promise<Coupon | undefined> {
        const [couponData] = await this.connection.query(`SELECT * FROM ecommerce.coupon WHERE code = '${couponCode}'`);

        if (!couponData) {
            return undefined;
        }

        const { code, expirationDate, percentage } = couponData;
        const expiration = new Date(expirationDate);
        const percentageAsNumber = parseFloat(percentage);
        const coupon = new Coupon(code, percentageAsNumber, expiration);

        return coupon;
    }
}