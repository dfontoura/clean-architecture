import GetItemsQuery from "../../application/query/get-items/get-items-query";
import Connection from "../database/connection";
import GetItemsQueryWebPresenter from "../presenter/get-items-query-web-presenter";

export default class ItemListController {

    constructor (readonly connection: Connection, readonly presenter: GetItemsQueryWebPresenter) {
    }

    async getItemList (): Promise<GetItemsQueryWebPresenter> {
        const getItemList = new GetItemsQuery(this.connection, this.presenter);
        await getItemList.execute();
        return this.presenter;
    }
}