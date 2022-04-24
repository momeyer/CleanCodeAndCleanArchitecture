import CpfValidator from "../src/CpfValidator";

describe("CPF validator", (): void => {
    const cpfValidator = new CpfValidator;

    test("undefined string", (): void => {
        let str: string;
        expect(cpfValidator.validate(str!)).toBeFalsy();
    });

    test("null string", (): void => {
        let str: any = null;
        expect(cpfValidator.validate(str!)).toBeFalsy();
    });

    test("too small", (): void => {
        let str = "111.111.11";
        expect(cpfValidator.validate(str)).toBeFalsy();
    });

    test("too big", (): void => {
        let str = "111.111.111.111";
        expect(cpfValidator.validate(str)).toBeFalsy();
    });

    test("with non-numeric character", (): void => {
        let str = "aaabbbcccdd";
        expect(cpfValidator.validate(str)).toBeFalsy();
    });

    test("invalid two dashes", (): void => {
        let str = "761-265-758.90";
        expect(cpfValidator.validate(str)).toBeFalsy();
    });

    test("invalid three dots", (): void => {
        let str = "761.265.758.90";
        expect(cpfValidator.validate(str)).toBeFalsy();
    });

    test("valid missing first dot", (): void => {
        let str = "111444.777-35";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });

    test("valid missing second dot", (): void => {
        let str = "111.444777-35";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });

    test("valid missing dash", (): void => {
        let str = "111.444.77735";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });

    test("valid", (): void => {
        let str = "111.444.777-35";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });

    test("valid without punctuation", (): void => {
        let str = "11144477735";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });

    test("valid with first digit 0", (): void => {
        let str = "820.106.058-02";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });

    test("valid with second digit 0", (): void => {
        let str = "761.265.758-90";
        expect(cpfValidator.validate(str)).toBeTruthy();
    });




});
