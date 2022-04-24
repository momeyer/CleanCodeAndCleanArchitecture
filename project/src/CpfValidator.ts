


export default class CpfValidator {

    private computePartialSum(str: string): number[] {
        let firstDigit = 0;
        let secondDigit = 0;
        for (let i = 1; i < str.length - 1; ++i) {
            const digito = parseInt(str.substring(i - 1, i));
            firstDigit = firstDigit + (11 - i) * digito;
            secondDigit = secondDigit + (12 - i) * digito;
        };
        return [firstDigit, secondDigit];
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

    check(str: string): boolean {

        let [partialSumFirstDigit, partialSumSecondDigit] = this.computePartialSum(str);

        const firstDigit = this.computeDigit(partialSumFirstDigit);

        partialSumSecondDigit += 2 * firstDigit;

        const secondDigit = this.computeDigit(partialSumSecondDigit);

        return this.validateVerificationDigits(str, firstDigit, secondDigit);

    }

    validate(str: string): boolean | undefined {

        if (!this.isValidInput(str)) { return false; }

        str = this.replacePontuationWithSpace(str);

        if (!this.isNumeric(str)) { return false; }

        return this.check(str);

    }

    private isValidInput(str: any): boolean {
        if (str === undefined || str === null)
            return false;
        if (str.length < 11 || str.length > 14)
            return false;
        return true;
    }

    private replacePontuationWithSpace(str: string): string {
        return str
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
            .replace(" ", "");
    }

    private isNumeric(str: string): boolean {
        return !isNaN(parseInt(str));
    }
}