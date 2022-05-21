import Cpf from '../../src/domain/entity/cpf';
import { CPF_NUMBERS } from '../mock/cpf-numbers';

const { validCpfNumbers, invalidCpfNumbers } = CPF_NUMBERS;


describe('Happy paths:', () => {
    test.each(validCpfNumbers)('Valid CPF "%s": Should return the CPF', (cpf) => {
        const newCpf = new Cpf(cpf);
        expect(newCpf.getValue()).toBe(cpf.replace(/[^\d]+/g, ''));
    });
});

describe('Exception paths:', () => {
    test('CPF not informed: should throw error "CPF is required"', () => {
        expect(() => new Cpf('')).toThrowError('CPF is required');
    });


    test.each(invalidCpfNumbers)('Invalid CPF "%s": should throw error "Invalid CPF".', (cpf) => {
        expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'));
    });
});
