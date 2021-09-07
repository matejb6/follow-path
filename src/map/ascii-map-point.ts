export class AsciiMapPoint {

    constructor(private readonly x: number, private readonly y: number, private readonly value: string) {
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
