export class AsciiMapPoint {

    /**
     * @description X
     */
    private readonly x: number;
    /**
     * @description Y
     */
    private readonly y: number;
    /**
     * @description Value
     */
    private readonly value: string;

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
