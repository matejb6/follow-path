export class AsciiMapPoint {
  constructor(private readonly x: number, private readonly y: number, private readonly value: string) {}

  /**
   * Returns x coordinate of a point
   * @returns X coordinate
   */
  public getX(): number {
    return this.x;
  }

  /**
   * Returns y coordinate of a point
   * @returns Y coordinate
   */
  public getY(): number {
    return this.y;
  }

  /**
   * Returns value contained in a point
   * @returns Value
   */
  public getValue(): string {
    return this.value;
  }
}
