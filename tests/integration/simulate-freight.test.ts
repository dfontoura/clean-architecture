import SimulateFreight from "../../src/application/use-cases/simulate-freight/simulate-freight";
import SimulateFreightInput from "../../src/application/use-cases/simulate-freight/simulate-freight-input";
import ItemRepositoryMemory from "../../src/infra/repository/memory/item-repository-memory";

const input: SimulateFreightInput = {
    orderItems: [ 
        {
            itemId: 1,
            quantity: 1
        },
        {
            itemId: 2,
            quantity: 1
        },
        {
            itemId: 3,
            quantity: 3
        },
    ]
};

test('Should simulate freight of an order', ()=> {
    const itemRepository = new ItemRepositoryMemory();
    const simulateFreight = new SimulateFreight(itemRepository);
    const output = simulateFreight.execute(input)
    expect(output.total).toBe(257);
});