import CouponRepository from "../repository/coupon-repository";
import ItemRepository from "../repository/item-repository";
import OrderRepository from "../repository/order-repository";
import StockEntryRepository from "../repository/stock-entry-repository";

export default interface RepositoryFactory {
    createItemRepository(): ItemRepository;
    createCouponRepository(): CouponRepository;
    createOrderRepository(): OrderRepository;
    createStockEntryRepository(): StockEntryRepository;
}