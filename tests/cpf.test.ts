import Cpf from "../src/cpf";

const invalidCpf = [
    '',
    'not  number',
    '123.456.789-0',
    '123.456.789-012',
    '111.111.111-11',
    '05434886654',
    '05434886670'
];

test.each(invalidCpf)('Invalid CPF: "%s". Should throw error.', (cpf) => {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid CPF"));
});

const validCpf = [
    '05434886674',
    '054.348.866-74',
    '068.251.206-03',
    '723.456.789-50'
];

test.each(validCpf)('Valid CPF: "%s". Should return the CPF', (cpf) => {
    const newCpf = new Cpf(cpf);
    expect(newCpf.getValue()).toBe(cpf);
});