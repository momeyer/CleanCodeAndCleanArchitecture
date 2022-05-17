
export class ShoppingCartIdGenerator {
    seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    generate(): string {
        this.seed++;
        return `SC${this.seed}`;
    }
}