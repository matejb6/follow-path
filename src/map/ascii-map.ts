import { constants } from '../shared/constants';
import { Direction } from '../shared/definitions';
import { AsciiMapPoint } from '../point/ascii-map-point';

export class AsciiMap {
  private readonly asciiMapPoints: AsciiMapPoint[];

  constructor(private readonly asciiMap: string) {
    this.asciiMapPoints = this.createAsciiMapPoints();
  }

  /**
   * Checks if end of row is reached
   * @param char Character
   * @returns End of row
   */
  private static isEndOfRow(char: string): boolean {
    return !(/[\r\n]/.exec(char) == null);
  }

  /**
   * Returns ASCII map character count
   * @param char Character
   * @returns ASCII map character count
   */
  private getAsciiMapCharCount(char: string): number {
    let charCount = 0;
    for (let i = 0; i < this.asciiMap.length; i++) {
      char === this.asciiMap.charAt(i) && charCount++;
    }
    return charCount;
  }

  /**
   * Checks if map has T fork,
   * finds cross points and checks if there are multiple horizontal and vertical paths
   * @returns Has map T fork
   */
  private hasTFork(): boolean {
    let hasTFork = false;
    const crossPoints: AsciiMapPoint[] = this.asciiMapPoints.filter(
      (asciiMapPoint: AsciiMapPoint) => asciiMapPoint.value === constants.cross
    );
    crossPoints.forEach((crossPoint: AsciiMapPoint) => {
      const surroundPointsValues: Array<string | undefined> = [];
      this.getPointSurroundingPoints(crossPoint).forEach((value: AsciiMapPoint | undefined) => {
        surroundPointsValues.push(value?.value);
      });
      const horizontalPathCount: number = surroundPointsValues.filter(
        (value) => value === constants.horizontalPath
      ).length;
      const verticalPathCount: number = surroundPointsValues.filter((value) => value === constants.verticalPath).length;
      if (
        (horizontalPathCount >= 2 && verticalPathCount >= 1) ||
        (horizontalPathCount >= 1 && verticalPathCount >= 2)
      ) {
        hasTFork = true;
      }
    });
    return hasTFork;
  }

  /**
   * Creates ASCII map points
   * @returns Created ASCII map points
   */
  private createAsciiMapPoints(): AsciiMapPoint[] {
    const asciiMapPoints: AsciiMapPoint[] = [];
    let column = 0;
    let row = 0;
    for (let i = 0; i < this.asciiMap.length; i++) {
      // Create each ASCII map point with position and value
      const asciiMapPoint = new AsciiMapPoint(column, row, this.asciiMap.charAt(i));
      if (AsciiMap.isEndOfRow(this.asciiMap.charAt(i))) {
        column = 0;
        row++;
      } else {
        column++;
        asciiMapPoints.push(asciiMapPoint);
      }
    }
    return asciiMapPoints;
  }

  /**
   * Returns north point from reference point
   * @param asciiMapPoint ASCII map point
   * @returns North point
   */
  private getNorthPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.y === asciiMapPoint.y - 1 && point.x === asciiMapPoint.x
    );
  }

  /**
   * Returns east point from reference point
   * @param asciiMapPoint ASCII map point
   * @returns East point
   */
  private getEastPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.y === asciiMapPoint.y && point.x === asciiMapPoint.x + 1
    );
  }

  /**
   * Returns south point from reference point
   * @param asciiMapPoint ASCII map point
   * @returns South point
   */
  private getSouthPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.y === asciiMapPoint.y + 1 && point.x === asciiMapPoint.x
    );
  }

  /**
   * Returns west point from reference point
   * @param asciiMapPoint ASCII map point
   * @returns West point
   */
  private getWestPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.y === asciiMapPoint.y && point.x === asciiMapPoint.x - 1
    );
  }

  /**
   * Returns ASCII map points
   * @returns ASCII map points
   */
  public get mapPoints(): AsciiMapPoint[] {
    return this.asciiMapPoints;
  }

  /**
   * Returns point surrounding points
   * @returns Point surrounding points
   */
  public getPointSurroundingPoints(asciiMapPoint: AsciiMapPoint): Map<Direction, AsciiMapPoint | undefined> {
    const pointSurroundingPoints: Map<Direction, AsciiMapPoint | undefined> = new Map<
      Direction,
      AsciiMapPoint | undefined
    >();
    pointSurroundingPoints.set(Direction.north, this.getNorthPoint(asciiMapPoint));
    pointSurroundingPoints.set(Direction.east, this.getEastPoint(asciiMapPoint));
    pointSurroundingPoints.set(Direction.south, this.getSouthPoint(asciiMapPoint));
    pointSurroundingPoints.set(Direction.west, this.getWestPoint(asciiMapPoint));
    return pointSurroundingPoints;
  }

  /**
   * Checks if map is valid
   * @param pathStartChar Path start character
   * @param pathEndChar Path end character
   * @returns Map valid
   */
  public isMapValid(pathStartChar: string, pathEndChar: string): boolean {
    return (
      this.getAsciiMapCharCount(pathStartChar) === 1 && this.getAsciiMapCharCount(pathEndChar) === 1 && !this.hasTFork()
    );
  }
}
