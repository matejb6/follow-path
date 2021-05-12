export class AsciiMapPoint {

    /**
     * @private
     * @readonly
     * @type number
     * @description X
     */
    private readonly x: number;
    /**
     * @private
     * @readonly
     * @type number
     * @description Y
     */
    private readonly y: number;
    /**
     * @private
     * @readonly
     * @type string
     * @description Value
     */
    private readonly value: string;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    /**
     * @public
     * @returns X
     * @description Returns X
     */
    public getX(): number {
        return this.x;
    }

    /**
     * @public
     * @returns Y
     * @description Returns Y
     */
    public getY(): number {
        return this.y;
    }

    /**
     * @public
     * @returns Value
     * @description Returns Value
     */
    public getValue(): string {
        return this.value;
    }

}
