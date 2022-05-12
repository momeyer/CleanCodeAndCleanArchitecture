import Cpf from "../src/domain/Cpf";

describe("CPF validator", (): void => {

    test("undefined cpf", (): void => {
        let str: string;
        expect((): Cpf => new Cpf(str!)).toThrow(new Error("Invalid CPF"));
    });

    test("too small", (): void => {
        let str = "111.111.11";
        expect((): Cpf => new Cpf(str)).toThrow(new Error("Invalid CPF"));
    });

    test("too big", (): void => {
        let str = "111.111.111.111";
        expect((): Cpf => new Cpf(str)).toThrow(new Error("Invalid CPF"));
    });

    test("with non-numeric character", (): void => {
        let str = "aaabbbcccdd";
        expect((): Cpf => new Cpf(str)).toThrow(new Error("Invalid CPF"));
    });

    test("invalid two dashes", (): void => {
        let str = "761-265-758.90";
        expect((): Cpf => new Cpf(str)).toThrow(new Error("Invalid CPF"));
    });

    test("invalid three dots", (): void => {
        let str = "761.265.758.90";
        expect((): Cpf => new Cpf(str)).toThrow(new Error("Invalid CPF"));
    });

    test("valid missing first dot", (): void => {
        let str = "111444.777-35";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });

    test("valid missing second dot", (): void => {
        let str = "111.444777-35";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });

    test("valid missing dash", (): void => {
        let str = "111.444.77735";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });

    test("valid", (): void => {
        let str = "111.444.777-35";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });

    test("valid without punctuation", (): void => {
        let str = "11144477735";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });

    test("valid with first digit 0", (): void => {
        let str = "820.106.058-02";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });

    test("valid with second digit 0", (): void => {
        let str = "761.265.758-90";
        expect((): Cpf => new Cpf(str)).not.toThrow();
    });


});
