export default class Item {
    private id: number;
    private category: string;
    private description: string;
    private price: number;

    constructor(id: number, category: string, description: string, price: number) {
        const missingParameter = (!id || !category || !description || !price);
        if (missingParameter) {
            throw new Error('Invalid parameters');
        }

        this.id = id;
        this.category = category;
        this.description = description;
        this.price = price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }
}