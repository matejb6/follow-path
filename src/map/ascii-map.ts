import { constants } from '../shared/constants';
import { Direction } from '../shared/definitions';
import { AsciiMapPoint } from './ascii-map-point';

export class AsciiMap {
  private readonly asciiMap: string;
  private readonly asciiMapPoints: AsciiMapPoint[];

  constructor(asciiMap: string) {
    this.asciiMap = asciiMap;
    this.asciiMapPoints = this.createAsciiMapPoints();
  }

  /**
   * @private
   * @static
   * @param char Character
   * @returns End of row
   * @description Checks if end of row is reached
   */
  private static isEndOfRow(char: string): boolean {
    return !!/[\r\n]/.exec(char);
  }

  /**
   * @private
   * @param char Character
   * @returns ASCII map character count
   * @description Returns ASCII map character count
   */
  private getAsciiMapCharCount(char: string): number {
    let charCount = 0;
    for (let i = 0; i < this.asciiMap.length; i++) {
      char === this.asciiMap.charAt(i) && charCount++;
    }
    return charCount;
  }

  /**
   * @private
   * @returns Has map T fork
   * @description Checks if map has T fork, finds cross points and checks if there are multiple horizontal and vertical paths
   */
  private hasTFork(): boolean {
    let hasTFork = false;
    const crossPoints: AsciiMapPoint[] = this.asciiMapPoints.filter(
      (asciiMapPoint: AsciiMapPoint) => asciiMapPoint.getValue() === constants.cross
    );
    crossPoints.forEach((crossPoint: AsciiMapPoint) => {
      const surroundPointsValues: (string | undefined)[] = [];
      this.getPointSurroundingPoints(crossPoint).forEach((value: AsciiMapPoint | undefined) => {
        surroundPointsValues.push(value?.getValue());
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
   * @private
   * @returns Created ASCII map points
   * @description Creates ASCII map points
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
   * @private
   * @param asciiMapPoint ASCII map point
   * @returns North point
   * @description Returns north point from reference point
   */
  private getNorthPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.getY() === asciiMapPoint.getY() - 1 && point.getX() === asciiMapPoint.getX()
    );
  }

  /**
   * @private
   * @param asciiMapPoint ASCII map point
   * @returns East point
   * @description Returns east point from reference point
   */
  private getEastPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.getY() === asciiMapPoint.getY() && point.getX() === asciiMapPoint.getX() + 1
    );
  }

  /**
   * @private
   * @param asciiMapPoint ASCII map point
   * @returns South point
   * @description Returns south point from reference point
   */
  private getSouthPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.getY() === asciiMapPoint.getY() + 1 && point.getX() === asciiMapPoint.getX()
    );
  }

  /**
   * @private
   * @param asciiMapPoint ASCII map point
   * @returns West point
   * @description Returns west point from reference point
   */
  private getWestPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
    return this.asciiMapPoints.find(
      (point: AsciiMapPoint) => point.getY() === asciiMapPoint.getY() && point.getX() === asciiMapPoint.getX() - 1
    );
  }

  /**
   * @public
   * @returns ASCII map
   * @description Returns ASCII map
   */
  public getAsciiMap(): string {
    return this.asciiMap;
  }

  /**
   * @public
   * @returns ASCII map points
   * @description Returns ASCII map points
   */
  public getAsciiMapPoints(): AsciiMapPoint[] {
    return this.asciiMapPoints;
  }

  /**
   * @public
   * @returns Point surrounding points
   * @description Returns point surrounding points
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
   * @public
   * @param pathStartChar Path start character
   * @param pathEndChar Path end character
   * @returns Map valid
   * @description Checks if map is valid
   */
  public isMapValid(pathStartChar: string, pathEndChar: string): boolean {
    return (
      this.getAsciiMapCharCount(pathStartChar) === 1 && this.getAsciiMapCharCount(pathEndChar) === 1 && !this.hasTFork()
    );
  }
}
