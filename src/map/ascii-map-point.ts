export class AsciiMapPoint {
  constructor(private readonly x: number, private readonly y: number, private readonly value: string) {}

  /**
   * @public
   * @returns X coordinate
   * @description Returns x coordinate of a point
   */
  public getX(): number {
    return this.x;
  }

  /**
   * @public
   * @returns Y coordinate
   * @description Returns y coordinate of a point
   */
  public getY(): number {
    return this.y;
  }

  /**
   * @public
   * @returns Value
   * @description Returns value contained in a point
   */
  public getValue(): string {
    return this.value;
  }
}
