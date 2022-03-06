import Cpf from '../src/cpf';

describe('Happy paths:', () => {
    const validCpf = [
        '12345678909',
        '123.456.789-09',
        '723.456.789-50'
    ];

    test.each(validCpf)('Valid CPF "%s": Should return the CPF', (cpf) => {
        const newCpf = new Cpf(cpf);
        expect(newCpf.getValue()).toBe(cpf.replace(/[^\d]+/g, ''));
    });
});

describe('Exception paths:', () => {
    const invalidCpf = [
        'not  number',
        '123.456.789-0',
        '123.456.789-090',
        '111.111.111-11',
        '123.456.789-00',
        '123.456.789-90',
        '12345678990'
    ];

    test('CPF not informed: should throw error "CPF is required"', () => {
        expect(() => new Cpf('')).toThrowError('CPF is required');
    })


    test.each(invalidCpf)('Invalid CPF "%s": should throw error "Invalid CPF".', (cpf) => {
        expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'));
    });
});
