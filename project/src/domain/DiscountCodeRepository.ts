import { DiscountCode } from "./entity/DiscountCode";


export interface DiscountCodeRepository {
    addDiscountCode(discountCode: DiscountCode): Promise<void>;
    getDiscount(code: string, curDate: Date): Promise<number>;
    isExpired(code: DiscountCode, curDate: Date): Promise<boolean>;
}

