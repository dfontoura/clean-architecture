import GetItemOutput from "../../application/query/get-items/get-item-output";
import GetItemsQueryPresenter from "../../application/query/get-items/get-items-query-presenter";

export default class GetItemsQueryWebPresenter implements GetItemsQueryPresenter {

    items: { 
        itemId: number, 
        description: string, 
        price: number, 
        formattedPrice: string 
    }[];

    constructor (readonly locale: string, readonly currency: string) {
        this.items = [];
    }

    present(items: GetItemOutput[]): void {
        for (const item of items) {
            const description = item.description.toUpperCase();

            const numberFormatConfig = { 
                currency: this.currency, 
                style: 'currency' 
            };

            const formattedPrice = new Intl.NumberFormat(this.locale, numberFormatConfig).format(item.price);

            this.items.push ({
                itemId: item.itemId,
                description,
                price: item.price,
                formattedPrice
            })
        }
    }
}