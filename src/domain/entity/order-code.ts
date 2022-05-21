export default class OrderCode {
    value: string;

    constructor(date: Date, sequence: number) {
        if (!date || !sequence) {
            throw new Error('Invalid parameters');
        }
        
        this.value = this.generateCode(date, sequence);
    }

    generateCode (date: Date, sequence: number): string {
        const year = date.getFullYear();
        const code = `${year}${sequence.toString().padStart(8, '0')}`;

        return code;
    }
}