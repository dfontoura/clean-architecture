export default class Dimension {
    private width: number;
    private height: number;
    private depth: number;
    private unit: string;

    constructor(width: number, height: number, depth: number, unit: string) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.unit = unit;
    }

    public getVolume(unit: string): number {
        const width = this.convertTo(this.width, this.unit, unit);
        const height = this.convertTo(this.height, this.unit, unit);
        const depth = this.convertTo(this.depth, this.unit, unit);

        return width * height * depth;
    }

    private convertTo(value: number, from: string, to: string): number {
        if (from === to) {
            return value;
        }
        if (from === 'm' && to === 'cm') {
            return value * 100;
        }
        if (from === 'cm' && to === 'm') {
            return value / 100;
        }

        throw new Error('Invalid unit');
    }

}