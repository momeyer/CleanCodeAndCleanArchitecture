import { DiscountCode } from "./DiscountCode";

export interface DiscountCodeRepository {
    addDiscountCode(discountCode: DiscountCode): void;
    getDiscount(code: string, curDate: Date): number;
    isExpired(code: DiscountCode, curDate: Date): boolean;
}

