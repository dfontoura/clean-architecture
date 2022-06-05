import RepositoryFactory from "../../domain/factory/repository-factory";
import CouponRepository from "../../domain/repository/coupon-repository";
import ItemRepository from "../../domain/repository/item-repository";
import OrderRepository from "../../domain/repository/order-repository";
import Connection from "../database/connection";
import CouponRepositoryDatabase from "../repository/database/coupon-repository-database";
import ItemRepositoryDatabase from "../repository/database/item-repository-database";
import OrderRepositoryDatabase from "../repository/database/order-repository-database";
import OrderRepositoryMemory from "../repository/memory/order-repository-memory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

    constructor(readonly connection: Connection) {
    }

    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.connection);
    }
    createCouponRepository(): CouponRepository {
        return new CouponRepositoryDatabase(this.connection);
    }
    createOrderRepository(): OrderRepository {
        return new OrderRepositoryMemory();
    }
}