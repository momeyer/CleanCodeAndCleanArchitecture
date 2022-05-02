
export type DiscountCode = {
    code: string,
    amount: number,
    expireDate: Date;
}

export class DiscountCodes {
    discountCodes = new Map<string, DiscountCode>();

    addDiscountCode(discountCode: DiscountCode): void {
        this.discountCodes.set(discountCode.code, discountCode);
    }

    getDiscount(code: string): number {
        let discountCode = this.discountCodes.get(code);

        if (!discountCode || this.isExpired(discountCode)) { return 0; }

        return discountCode.amount;
    }

    isExpired(code: DiscountCode): boolean {
        let today = new Date();

        if (code.expireDate < today) { return true; }

        return false;
    }
}