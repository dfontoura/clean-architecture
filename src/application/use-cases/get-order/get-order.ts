import RepositoryFactory from "../../../domain/factory/repository-factory";
import OrderRepository from "../../../domain/repository/order-repository";
import GetOrderOutput from "./get-order-output";

export default class GetOrder {

    private orderRepository: OrderRepository;

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute (code: string): Promise<GetOrderOutput> {
        const order = await this.orderRepository.getByCode(code);
        const total = order.getTotal();
        const output = new GetOrderOutput(total);
        return output;
    }
}
