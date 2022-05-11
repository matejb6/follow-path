import { constants } from '../shared/constants';
import { AsciiMap } from './ascii-map';
import { AsciiMapPoint } from './ascii-map-point';
import { Direction } from '../shared/definitions';

export class Path {
  private readonly pathPoints: AsciiMapPoint[];

  constructor(asciiMap: AsciiMap) {
    this.pathPoints = this.findPathPoints(asciiMap);
  }

  private static isDirectionChange(asciiMapPoint: AsciiMapPoint, directionChangeChar: string): boolean {
    return asciiMapPoint.getValue() === directionChangeChar;
  }

  private static isNextPointAllowed(asciiMapPoint: AsciiMapPoint | undefined): boolean {
    return (
      constants.alphabet.includes(asciiMapPoint?.getValue() || '') ||
      asciiMapPoint?.getValue() === constants.cross ||
      asciiMapPoint?.getValue() === constants.pathEndChar ||
      asciiMapPoint?.getValue() === constants.verticalPath ||
      asciiMapPoint?.getValue() === constants.horizontalPath
    );
  }

  /**
   * @private
   * @returns Found ASCII map points
   * @description Finds map start point, goes along path until end point and returns found map points
   */
  private findPathPoints(asciiMap: AsciiMap): AsciiMapPoint[] {
    const pathPoints: AsciiMapPoint[] = [];
    let direction: Direction | undefined;
    // Find first point, the entry point
    let marker: AsciiMapPoint | undefined = asciiMap
      .getAsciiMapPoints()
      .find((point: AsciiMapPoint) => point.getValue() === constants.pathStartChar);
    if (marker) {
      pathPoints.push(marker);
    }
    let i = 0;
    while (!this.isPathEnd(pathPoints, constants.pathEndChar) && i <= asciiMap.getAsciiMapPoints().length) {
      if (marker) {
        const northPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.north);
        const eastPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.east);
        const southPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.south);
        const westPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.west);

        const goNorth = Path.isNextPointAllowed(northPoint);
        const goEast = Path.isNextPointAllowed(eastPoint);
        const goSouth = Path.isNextPointAllowed(southPoint);
        const goWest = Path.isNextPointAllowed(westPoint);

        // Get direction from starting point
        if (marker.getValue() === constants.pathStartChar) {
          if (goNorth) {
            direction = Direction.north;
          } else if (goEast) {
            direction = Direction.east;
          } else if (goSouth) {
            direction = Direction.south;
          } else if (goWest) {
            direction = Direction.west;
          }
        }

        // Check direction and if possible to go to next point
        // First: check direction
        // Second: check if cross (direction change)
        // Third: check if letter and if no point ahead to go (direction change)
        // Fourth: go straight if possible
        if (direction === Direction.north) {
          if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(northPoint && goNorth))) &&
            eastPoint &&
            goEast
          ) {
            pathPoints.push(eastPoint);
            direction = Direction.east;
            marker = eastPoint;
          } else if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(northPoint && goNorth))) &&
            westPoint &&
            goWest
          ) {
            pathPoints.push(westPoint);
            direction = Direction.west;
            marker = westPoint;
          } else if (northPoint && goNorth) {
            pathPoints.push(northPoint);
            marker = northPoint;
          }
        } else if (direction === Direction.east) {
          if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(eastPoint && goEast))) &&
            northPoint &&
            goNorth
          ) {
            pathPoints.push(northPoint);
            direction = Direction.north;
            marker = northPoint;
          } else if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(eastPoint && goEast))) &&
            southPoint &&
            goSouth
          ) {
            pathPoints.push(southPoint);
            direction = Direction.south;
            marker = southPoint;
          } else if (eastPoint && goEast) {
            pathPoints.push(eastPoint);
            marker = eastPoint;
          }
        } else if (direction === Direction.south) {
          if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(southPoint && goSouth))) &&
            eastPoint &&
            goEast
          ) {
            pathPoints.push(eastPoint);
            direction = Direction.east;
            marker = eastPoint;
          } else if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(southPoint && goSouth))) &&
            westPoint &&
            goWest
          ) {
            pathPoints.push(westPoint);
            direction = Direction.west;
            marker = westPoint;
          } else if (southPoint && goSouth) {
            pathPoints.push(southPoint);
            marker = southPoint;
          }
        } else if (direction === Direction.west) {
          if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(westPoint && goWest))) &&
            southPoint &&
            goSouth
          ) {
            pathPoints.push(southPoint);
            direction = Direction.south;
            marker = southPoint;
          } else if (
            (Path.isDirectionChange(marker, constants.cross) ||
              (constants.alphabet.includes(marker.getValue()) && !(westPoint && goWest))) &&
            northPoint &&
            goNorth
          ) {
            pathPoints.push(northPoint);
            direction = Direction.north;
            marker = northPoint;
          } else if (westPoint && goWest) {
            pathPoints.push(westPoint);
            marker = westPoint;
          }
        }
      }
      i++;
    }
    return pathPoints;
  }

  /**
   * @private
   * @param pathPoints Path points
   * @param pathEndChar Path end char
   * @returns Path end
   * @description Checks if path end is reached
   */
  private isPathEnd(pathPoints: AsciiMapPoint[], pathEndChar: string): boolean {
    return pathPoints.some((point: AsciiMapPoint) => point.getValue() === pathEndChar);
  }

  /**
   * @public
   * @returns Path as string
   * @description Retrieves path values and puts them into single path string
   */
  public getPathAsString(): string {
    let pathAsString = '';
    this.pathPoints.forEach((point: AsciiMapPoint) => {
      pathAsString = pathAsString.concat(point.getValue());
    });
    return pathAsString;
  }

  /**
   * @public
   * @param alphabet Alphabet
   * @returns Collected letters
   * @description Collects letters from path
   */
  public collectLetters(alphabet: string[]): string {
    let letters = '';
    this.pathPoints.forEach((point: AsciiMapPoint) => {
      // Collect letters, but only if not collected already
      if (alphabet.includes(point.getValue()) && !letters.includes(point.getValue())) {
        letters = letters.concat(point.getValue());
      }
    });
    return letters;
  }
}
