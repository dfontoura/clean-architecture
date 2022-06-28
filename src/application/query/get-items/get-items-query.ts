import Connection from "../../../infra/database/connection";
import GetItemOutput from "./get-item-output";
import GetItemsQueryPresenter from "./get-items-query-presenter";

export default class GetItemsQuery {

    constructor (readonly connection: Connection, readonly presenter: GetItemsQueryPresenter) {
    }

    async execute (): Promise<void> {
        const itemsData = await this.connection.query('select * from ecommerce.item');
        const getItemsOutput: GetItemOutput[] = [];

        for (const itemData of itemsData) {
            const { id_item, description, price } = itemData;
            const item = new GetItemOutput(id_item, description, parseFloat(price));
            getItemsOutput.push(item);
        }

        this.presenter.present(getItemsOutput);
    }
}