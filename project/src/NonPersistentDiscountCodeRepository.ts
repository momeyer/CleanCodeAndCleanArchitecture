import { DiscountCodeRepository } from "./domain/repository/DiscountCodeRepository";
import { DiscountCode } from "./domain/entity/DiscountCode";

export class NonPersistenDiscountCodeRepository implements DiscountCodeRepository {
    discountCodes = new Map<string, DiscountCode>();

    async add(discountCode: DiscountCode): Promise<void> {
        this.discountCodes.set(discountCode.code, discountCode);
    }

    async getDiscount(code: string, curDate: Date): Promise<number> {
        const discountCode = this.discountCodes.get(code);
        if (!discountCode) {
            return 0;
        }

        const isExpired = await this.isExpired(discountCode, curDate);
        if (isExpired) {
            return 0;
        }

        return discountCode.amount;
    }

    async isExpired(code: DiscountCode, curDate: Date): Promise<boolean> {

        if (code.expireDate < curDate) { return true; }

        return false;
    }
}
