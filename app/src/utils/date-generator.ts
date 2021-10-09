export class DateGenerator {
    private _date: Date;

    constructor() {
        this._date = new Date();
    }

    generate() {
        this._date = new Date();
        return this._date;
    }

    lastGenerated() {
        return this._date;
    }
}
