export class AsciiMapPoint {

    /**
     * @type number
     * @description X
     */
    private x: number;
    /**
     * @type number
     * @description Y
     */
    private y: number;
    /**
     * @type string
     * @description Value
     */
    private value: string;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    /**
     * @returns X
     * @description Returns X
     */
    public getX(): number {
        return this.x;
    }

    /**
     * @returns Y
     * @description Returns Y
     */
    public getY(): number {
        return this.y;
    }

    /**
     * @returns Value
     * @description Returns Value
     */
     public getValue(): string {
        return this.value;
    }

}
