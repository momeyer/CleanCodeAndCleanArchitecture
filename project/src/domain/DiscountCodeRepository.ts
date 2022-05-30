import { DiscountCode } from "./entity/DiscountCode";


export interface DiscountCodeRepository {
    add(discountCode: DiscountCode): Promise<void>;
    getDiscount(code: string, curDate: Date): Promise<number>;
    isExpired(code: DiscountCode, curDate: Date): Promise<boolean>;
}


