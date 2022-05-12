export type Weight_kg = {
    value: number;
}
export class DimensionsAndWeight {
    constructor(readonly height_cm: number,
        readonly width_cm: number,
        readonly depth_cm: number,
        readonly weight: Weight_kg) { }

}
