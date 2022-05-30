
export class ShoppingCartIdGenerator {
    private seed: number;

    constructor(seed: number = 0) {
        this.seed = seed;
    }

    generate(): string {
        this.seed++;
        return `SC${this.seed}`;
    }
}