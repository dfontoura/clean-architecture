import Freight from "../../../domain/entity/Freight";
import ItemRepository from "../../../domain/repository/item-repository";
import SimulateFreightInput from "./simulate-freight-input";
import SimulateFreightOutput from "./simulate-freight-output";

export default class SimulateFreight {
    constructor(readonly itemRepository: ItemRepository) {
    }

    execute(input: SimulateFreightInput): SimulateFreightOutput {
        const distance = 1000;
        const freight = new Freight(distance);
        const {orderItems } = input;
        orderItems.map(orderItem => {
            const { itemId, quantity } = orderItem;
            const item = this.itemRepository.getById(itemId);

            if (!item) {
                throw new Error("Item not found");
            }

            freight.addItem(item, quantity);
        });

        const total = freight.getTotal();
        const output = new SimulateFreightOutput(total);
        return output;
    }
}