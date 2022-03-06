const MINIMUM_SHIPPING_PRICE = 10;

export default class Item {
    private id: number;
    private category: string;
    private description: string;
    private price: number;
    private height: number;
    private width: number;
    private depth: number;
    private weight: number;

    constructor(params: ItemParameters) {
        const isAnyParameterInvalid = !this.validateParameters(params);
        if (isAnyParameterInvalid) {
            throw new Error('Invalid parameters');
        }

        this.id = params.id;
        this.category = params.category;
        this.description = params.description;
        this.price = params.price;
        this.height = params.height;
        this.width = params.width;
        this.depth = params.depth;
        this.weight = params.weight;
    }

    private validateParameters(params: ItemParameters): boolean {
        const isValid = (
            !!params.id && 
            !!params.category && 
            !!params.description && 
            !!params.price &&
            !!params.height &&
            !!params.width &&
            !!params.depth &&
            !!params.weight
        );

        return isValid;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }

    public getShipping(distance: number): number {
        const volume = this.getVolume();
        const density = this.weight / volume;
        const price = distance * volume * (density/100);
        const minimumPrice = MINIMUM_SHIPPING_PRICE;

        return price > minimumPrice ? price : minimumPrice;
    }

    private getVolume(): number {
        return this.height * this.width * this.depth / 1000000;
    }
}

export type ItemParameters = {
    id: number,
    category: string,
    description: string,
    price: number,
    height: number,
    width: number,
    depth: number,
    weight: number
}