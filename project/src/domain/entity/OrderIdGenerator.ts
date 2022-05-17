

export class OrderIdGenerator {
    seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    generate(date: Date): string {
        const year = date.getFullYear();
        const minDigits = 8;
        let sequencial = this.seed.toString().padStart(minDigits, "0");
        this.seed++;
        return `${year}${sequencial}`;
    }
}