import RepositoryFactory from "../../domain/factory/repository-factory";
import ItemListController from "../controller/items-list-controller";
import OrderListController from "../controller/order-list-controller";
import Connection from "../database/connection";
import GetItemsQueryWebPresenter from "../presenter/get-items-query-web-presenter";
import Http from "./http";

export default class Router {

    constructor (
        readonly http: Http, 
        readonly repositoryFactory: RepositoryFactory, 
        readonly connection: Connection
    ) {
        this.init();
    }

    init () {
        this.http.route('get', '/orders', async (params: any, body: any) => {
            const orderListController = new OrderListController(this.repositoryFactory);
            const output = await orderListController.getOrderList();
            return output;
        });

        this.http.route('get', '/items', async (params: any, body: any) => {
            const presenter = new GetItemsQueryWebPresenter('pt-BR', 'BRL');
            const itemListController = new ItemListController(this.connection, presenter);
            await itemListController.getItemList();
            return presenter.items;
        });
    }
}
