import Dimension from "../../../domain/entity/dimension";
import Item from "../../../domain/entity/item";
import ItemRepository from "../../../domain/repository/item-repository";
import Connection from "../../database/connection";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(readonly connection: Connection) {
    }

    async getById(itemId: number): Promise<Item | undefined> {
        const [itemData] = await this.connection.query(`SELECT * FROM ecommerce.item WHERE id_item = ${itemId}`);
        
        if (!itemData) {
            return undefined;
        }
        
        const { id_item, category, description, price, width, height, length, weight  } = itemData;
        const dimensions = new Dimension(width, height, length, 'cm');
        const priceAsNumber = parseFloat(price);
        const item = new Item({ id: id_item, category, description, price: priceAsNumber, dimensions, weight })

        return item;
    }
}