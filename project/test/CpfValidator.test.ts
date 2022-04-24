import { validate } from "../src/CpfValidator";

describe("CPF validator", (): void => {
    test("undefined string", (): void => {
        let str: string;
        expect(validate(str!)).toBeFalsy();
    });

    test("null string", (): void => {
        let str: any = null;
        expect(validate(str!)).toBeFalsy();
    });

    test("too small", (): void => {
        let str = "111.111.11";
        expect(validate(str)).toBeFalsy();
    });

    test("too big", (): void => {
        let str = "111.111.111.111";
        expect(validate(str)).toBeFalsy();
    });

    test("with non-numeric character", (): void => {
        let str = "aaabbbcccdd";
        expect(validate(str)).toBeFalsy();
    });

    test("with missing dot", (): void => {
        let str = "";
        expect(validate(str)).toBeFalsy();
    });

    test("valid", (): void => {
        let str = "111.444.777-35";
        expect(validate(str)).toBeTruthy();
    });

    test("valid without punctuation", (): void => {
        let str = "11144477735";
        expect(validate(str)).toBeTruthy();
    });

    test("valid with first digit 0", (): void => {
        let str = "820.106.058-02";
        expect(validate(str)).toBeTruthy();
    });

    test("valid with second digit 0", (): void => {
        let str = "761.265.758-90";
        expect(validate(str)).toBeTruthy();
    });



});
