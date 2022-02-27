const validateCPF = require('../src/cpf');

test("Should return false if the CPF's is undefined (not provided)", () => {
    const  isValid = validateCPF.validateCPF();
    expect(isValid).toBe(false);
});

test("Should return false if CPF is null", () => {
    const  isValid = validateCPF.validateCPF(null);
    expect(isValid).toBe(false);
});

test("Should return false if the CPF's length is smaller then 11", () => {
    const smallCpf = "0543488667";
    const  isValid = validateCPF.validateCPF(smallCpf);
    expect(isValid).toBe(false);
});

test("Should return false if the CPF's length is bigger than 14", () => {
    const smallCpf = "054.348.866-740";
    const  isValid = validateCPF.validateCPF(smallCpf);
    expect(isValid).toBe(false);
});

test("Should return false if the CPF has invalid first check digit", () => {
    const invalidCpf = "05434886654";
    const  isValid = validateCPF.validateCPF(invalidCpf);
    expect(isValid).toBe(false);
});

test("Should return false if the CPF has invalid second check digit", () => {
    const invalidCpf = "05434886670";
    const  isValid = validateCPF.validateCPF(invalidCpf);
    expect(isValid).toBe(false);
});

test("Should return false if CPF is all the same number", () => {
    const  isValid = validateCPF.validateCPF('11111111111');
    expect(isValid).toBe(false);
});

test("Should return false if CPF is not a number", () => {
    const  isValid = validateCPF.validateCPF('codigodecpf');
    expect(isValid).toBe(false);
});

test("Should return true if the CPF is valid", () => {
    const validCpf = "05434886674";
    const  isValid = validateCPF.validateCPF(validCpf);
    expect(isValid).toBe(true);
});

test("Should return true if the CPF is valid and first check digit is 0", () => {
    const validCpf = "06825120603";
    const  isValid = validateCPF.validateCPF(validCpf);
    expect(isValid).toBe(true);
});

test("Should return true if the CPF is valid and second digit is 0", () => {
    const validCpf = "72345678950";
    const  isValid = validateCPF.validateCPF(validCpf);
    expect(isValid).toBe(true);
});