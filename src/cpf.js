const CPF_LENGTH = 11;
const FIRST_DIGIT_POSITION = 9;
const SECOND_DIGIT_POSITION = 10;
const MINIMUM_MULTIPLIER = 2;

exports.validateCPF = function (cpf) {
    if (!cpf) return false;
    const formattedCPF = formatCPF(cpf);

    const isInvalid = isInvalidString(formattedCPF);
    if (isInvalid) return false;

    const isFirstCheckDigitValid = validateCheckDigit(formattedCPF, FIRST_DIGIT_POSITION);
    if (!isFirstCheckDigitValid) return false;

    const isSecondCheckDigitValid = validateCheckDigit(formattedCPF, SECOND_DIGIT_POSITION);

    return isSecondCheckDigitValid;
}

validateCheckDigit = function (cpf, checkDigitPosition) {
    const initialMultiplier = checkDigitPosition + MINIMUM_MULTIPLIER - 1;
    const calculatedCheckDigit = this.calculateCheckDigit(cpf, initialMultiplier);
    const informedCheckDigit = cpf[checkDigitPosition];

    return informedCheckDigit == calculatedCheckDigit;;
}

calculateCheckDigit = function (cpf, initialMultiplier) {
    const cpfLength = CPF_LENGTH;
    const minimunMultiplier = MINIMUM_MULTIPLIER;

    const totalSum = cpf.reduce((sum, currentDigit, currentIndex) => {
        const multiplier = initialMultiplier - currentIndex;
        if (multiplier < minimunMultiplier) {
            return sum;
        }
        return sum + (parseInt(currentDigit) * multiplier);
    }, 0);

    const divisionRemainder = totalSum % cpfLength;
    const checkDigit = divisionRemainder < 2 ? 0 : cpfLength - divisionRemainder;

    return checkDigit;
}

formatCPF = function (cpf) {
    return cpf
        .replace(/[^\d]+/g, '')
        .split("")
}

isInvalidString = function (cpf) {
    const hasInvalidLength = cpf.length !== CPF_LENGTH;
    const hasAllCharactersTheSame = cpf.every(digit => digit === cpf[0])
    const hasNaNCharacter = cpf.some(digit => isNaN(digit));

    return (hasInvalidLength || hasAllCharactersTheSame || hasNaNCharacter);
}
