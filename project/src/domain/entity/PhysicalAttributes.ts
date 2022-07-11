export class PhysicalAttributes {
  constructor(
    readonly height_cm: number,
    readonly width_cm: number,
    readonly depth_cm: number,
    readonly weight_kg: number
  ) {
    if (height_cm <= 0 || width_cm <= 0 || depth_cm <= 0 || weight_kg <= 0) {
      throw new Error("Dimensions should always be bigger than 0");
    }
  }

  calculateVolumeInM3(): number {
    const dimensionsInCm3 = this.height_cm * this.width_cm * this.depth_cm;
    return dimensionsInCm3 / 1000000;
  }

  calculateDensityInKgPerM3(): number {
    return this.weight_kg / this.calculateVolumeInM3();
  }
}
