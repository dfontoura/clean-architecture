export default class Cpf {
    private CPF_LENGTH = 11;
    private FIRST_DIGIT_POSITION = 9;
    private SECOND_DIGIT_POSITION = 10;
    private MINIMUM_MULTIPLIER = 2;

    private value: string;

    constructor(value: string) {
        if (!value) {
            throw new Error('CPF is required');
        }
        const  sanitedValue = this.sanitize(value);
        const isValid = this.validate(sanitedValue);
        if (!isValid) {
            throw new Error("Invalid CPF");
        }

        this.value = sanitedValue;
    }

    public getValue () {
        return this.value;
    }

    private sanitize (cpf:string) {
        return cpf.replace(/[^\d]+/g, '')
    }

    private validate (cpf: string) {
        const formattedCPF = this.formatCPF(cpf);
        const isInvalid = this.isInvalidString(formattedCPF);
        if (isInvalid) return false;

        const isFirstCheckDigitValid = this.validateCheckDigit(formattedCPF, this.FIRST_DIGIT_POSITION);
        if (!isFirstCheckDigitValid) return false;

        const isSecondCheckDigitValid = this.validateCheckDigit(formattedCPF, this.SECOND_DIGIT_POSITION);

        return isSecondCheckDigitValid;
    }
    
    private formatCPF (cpf: string) {
        return cpf
            .split("")
            .map((digit) => parseInt(digit));
    }
        
    private isInvalidString (cpf: number[]) {
        const hasInvalidLength = cpf.length !== this.CPF_LENGTH;
        const hasAllCharactersTheSame = cpf.every(digit => digit === cpf[0])
        const hasNaNCharacter = cpf.some(digit => Number.isNaN(digit));

        return (hasInvalidLength || hasAllCharactersTheSame || hasNaNCharacter);
    }

    private validateCheckDigit (cpf: number[], checkDigitPosition: number) {
        const initialMultiplier = checkDigitPosition + this.MINIMUM_MULTIPLIER - 1;
        const calculatedCheckDigit = this.calculateCheckDigit(cpf, initialMultiplier);
        const informedCheckDigit = cpf[checkDigitPosition];

        return informedCheckDigit == calculatedCheckDigit;;
    }

    private calculateCheckDigit (cpf: number[], initialMultiplier: number) {
        const cpfLength = this.CPF_LENGTH;
        const minimunMultiplier = this.MINIMUM_MULTIPLIER;

        const totalSum = cpf.reduce((sum, currentDigit, currentIndex) => {
            const multiplier = initialMultiplier - currentIndex;
            if (multiplier < minimunMultiplier) {
                return sum;
            }
            return sum + (currentDigit * multiplier);
        }, 0);

        const divisionRemainder = totalSum % cpfLength;
        const checkDigit = divisionRemainder < 2 ? 0 : cpfLength - divisionRemainder;

        return checkDigit;
    }
}