
export class DimensionsAndWeight {
    constructor(readonly height_cm: number,
        readonly width_cm: number,
        readonly depth_cm: number,
        readonly weight_kg: number) {
        if (height_cm <= 0 || width_cm <= 0 || depth_cm <= 0 || weight_kg <= 0) {
            throw new Error("Dementions should alway be bigger than 0");
        }
    }
}
