import GetOrderList from "../../application/use-cases/get-order-list/get-order-list";
import GetOrderOutput from "../../application/use-cases/get-order/get-order-output";
import RepositoryFactory from "../../domain/factory/repository-factory";

export default class OrderListController {

    constructor (readonly repositoryFactory: RepositoryFactory) {
    }

    getOrderList (): Promise<GetOrderOutput[]> {
        const getOrderList = new GetOrderList(this.repositoryFactory);
        return getOrderList.execute();
    }
}