export default class StockEntry {
  constructor(readonly itemId: number, readonly operation: "in" | "out", readonly quantity: number) {}
}
