import RepositoryFactory from "../../../domain/factory/repository-factory";
import OrderRepository from "../../../domain/repository/order-repository";
import GetOrderOutput from "../get-order/get-order-output";

export default class GetOrderList {

    private orderRepository: OrderRepository;

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute (): Promise<GetOrderOutput[]> {
        const orderList = await this.orderRepository.getAll();
        const output: GetOrderOutput[] = orderList.map(order => new GetOrderOutput(order.getTotal()));
        return output;
    }
}