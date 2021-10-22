export class AsciiMapPoint {

    constructor(private readonly x: number, private readonly y: number, private readonly value: string) {
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getValue(): string {
        return this.value;
    }

}
