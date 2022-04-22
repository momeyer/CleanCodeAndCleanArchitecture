
export default class DateAndTime extends Date {
    isOvernight(): boolean {
        return (this.getHours() >= 22 || this.getHours() <= 6);
    }

    isSunday(): boolean {
        return (this.getDay() === 0);
    }
}
