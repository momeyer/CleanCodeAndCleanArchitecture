import { DiscountCode } from "./domain/entity/DiscountCode";
import { DiscountCodeRepository } from "./domain/DiscountCodeRepository";

export class NonPersistenDiscountCodeRepository implements DiscountCodeRepository {
    discountCodes = new Map<string, DiscountCode>();

    async addDiscountCode(discountCode: DiscountCode): Promise<void> {
        this.discountCodes.set(discountCode.code, discountCode);
    }

    async getDiscount(code: string, curDate: Date): Promise<number> {
        let discountCode = this.discountCodes.get(code);

        if (!discountCode || await this.isExpired(discountCode, curDate)) { return 0; }

        return discountCode.amount;
    }

    async isExpired(code: DiscountCode, curDate: Date): Promise<boolean> {

        if (code.expireDate < curDate) { return true; }

        return false;
    }
}
