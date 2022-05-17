
export type ShoppingCartId = {
    value: string
}

export class ShoppingCartIdGenerator {
    seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    generate(): ShoppingCartId {
        this.seed++;
        return { value: `SC${this.seed}` };
    }
}