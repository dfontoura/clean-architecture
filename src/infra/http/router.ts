import RepositoryFactory from "../../domain/factory/repository-factory";
import OrderListController from "../controller/order-list-controller";
import Http from "./http";

export default class Router {

    constructor (readonly http: Http, readonly repositoryFactory: RepositoryFactory) {
    }

    init () {
        this.http.route('get', '/orders', (params: any, body: any) => {
            const orderListController = new OrderListController(this.repositoryFactory);
            const output = orderListController.getOrderList();
            return output;
        });
    }
}
