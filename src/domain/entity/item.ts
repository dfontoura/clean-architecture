import Dimension from "./dimension";

export default class Item {
    private id: number;
    private category: string;
    private description: string;
    private price: number;
    private dimensions: Dimension | undefined;
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
        this.dimensions = params.dimensions;
        this.weight = params.weight;
    }

    private validateParameters(params: ItemParameters): boolean {
        const isValid = (
            !!params.id && 
            !!params.category && 
            !!params.description && 
            !!params.price &&
            !!params.dimensions &&
            !!params.weight &&
            params.weight >= 0
        );

        return isValid;
    }

    public getId(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }

    public getVolume(unit: string): number {
        if (!this.dimensions) {
            return 0;
        }

        return this.dimensions.getVolume(unit);
    }

    public getWeight(): number {
        return this.weight;
    }

    public getDensity(): number {
        const volume = this.getVolume('m');
        const density = this.weight / volume;

        return density;
    }
}

export type ItemParameters = {
    id: number,
    category: string,
    description: string,
    price: number,
    dimensions: Dimension,
    weight: number
}