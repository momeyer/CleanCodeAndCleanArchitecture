import { DiscountCode } from "../../domain/entity/DiscountCode";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import Connection from "../database/Connection";

export class DBDiscountCodeRepository implements DiscountCodeRepository {
  constructor(readonly connection: Connection) {}

  async add(discountCode: DiscountCode): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getDiscount(code: string, curDate: Date): Promise<number> {
    const [data] = await this.connection.query(`select * from discount_codes where code = '${code}'`);
    if (!data) {
      return 0;
    }
    const discountCode: DiscountCode = {
      code: data.code,
      amount: data.amount,
      expireDate: data.expire_date,
    };

    if (await this.isExpired(discountCode, curDate)) {
      return 0;
    }

    return discountCode.amount;
  }

  async isExpired(code: DiscountCode, curDate: Date): Promise<boolean> {
    if (code.expireDate < curDate) {
      return true;
    }

    return false;
  }
}
