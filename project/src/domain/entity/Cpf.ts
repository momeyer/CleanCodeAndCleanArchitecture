
export default class Cpf {
    readonly value: string;

    constructor(readonly cpf: string) {
        if (!this.isValid(cpf)) { throw new Error("Invalid CPF"); }
        this.value = cpf;
    }

    private isValid(rawCpf: string): boolean {

        if (!this.isValidInput(rawCpf)) { return false; }

        rawCpf = this.replacePontuationWithSpace(rawCpf);

        if (!this.isNumeric(rawCpf)) { return false; }

        return this.isValidCpf(rawCpf);
    }

    private isValidInput(str: any): boolean {
        if (!str)
            return false;
        if (str.length < 11 || str.length > 14)
            return false;
        return true;
    }

    private isNumeric(str: string): boolean {
        return !isNaN(parseInt(str));
    }

    private replacePontuationWithSpace(str: string): string {
        return str
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
            .replace(" ", "");
    }

    private isValidCpf(str: string): boolean {
        const firstDigit = this.computeFirstDigit(str);
        const secondDigit = this.computeSecondDigit(str, firstDigit);

        return this.validateVerificationDigits(str, firstDigit, secondDigit);

    }

    private computeFirstDigit(str: string): number {
        const offset = 11;
        const sum = this.computePartialSum(str, offset);

        return this.computeDigit(sum);
    }

    private computeSecondDigit(str: string, firstDigit: number): number {
        const offset = 12;
        let sum = this.computePartialSum(str, offset);

        sum += 2 * firstDigit;

        return this.computeDigit(sum);
    }

    private computePartialSum(str: string, offset: number): number {
        let sum = 0;

        for (let i = 1; i < str.length - 1; ++i) {
            const current = parseInt(str.substring(i - 1, i));
            sum = sum + (offset - i) * current;
        };
        return sum;
    }

    private computeDigit(digit: number): number {
        const rest = (digit % 11);
        return (rest < 2) ? 0 : 11 - rest;
    }

    private validateVerificationDigits(inputCPF: string, first: number, second: number): boolean {
        const originalDigits = inputCPF.substring(inputCPF.length - 2, inputCPF.length);
        const calculatedDigits = "" + first + "" + second;
        return originalDigits === calculatedDigits;

    }
}