import { DiscountCodeRepository } from "./domain/DiscountCodeRepository";
import { DiscountCode } from "./domain/DiscountCode";

export class NonPersistenDiscountCodeRepository implements DiscountCodeRepository {
    discountCodes = new Map<string, DiscountCode>();

    addDiscountCode(discountCode: DiscountCode): void {
        this.discountCodes.set(discountCode.code, discountCode);
    }

    getDiscount(code: string, curDate: Date): number {
        let discountCode = this.discountCodes.get(code);

        if (!discountCode || this.isExpired(discountCode, curDate)) { return 0; }

        return discountCode.amount;
    }

    isExpired(code: DiscountCode, curDate: Date): boolean {

        if (code.expireDate < curDate) { return true; }

        return false;
    }
}
