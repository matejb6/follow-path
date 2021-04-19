
import { constants } from '../shared/constants'
import { AsciiMap } from './ascii-map';
import { AsciiMapPoint } from './ascii-map-point';
import { Direction } from '../shared/definitions';

export class Path {

    /**
     * @public
     * @static
     * @param asciiMap ASCII map
     * @description Finds map start point and goes along path until end point
     */
    public static followPath(asciiMap: AsciiMap): void {
        const pathPoints: AsciiMapPoint[] = [];
        let direction: Direction | undefined;
        // Find first point, the entry point
        let marker: AsciiMapPoint | undefined = asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => point.getValue() === constants.pathStartChar);
        if (marker) {
            pathPoints.push(marker);
        }
        let i: number = 0;
        while (!this.isPathEndReached(pathPoints) && i <= asciiMap.getAsciiMapPoints().length) {
            if (marker) {
                const northPoint = Path.getNorthPoint(asciiMap, marker);
                const eastPoint = Path.getEastPoint(asciiMap, marker);
                const southPoint = Path.getSouthPoint(asciiMap, marker);
                const westPoint = Path.getWestPoint(asciiMap, marker);

                const goNorth = Path.goNextPoint(northPoint);
                const goEast = Path.goNextPoint(eastPoint);
                const goSouth = Path.goNextPoint(southPoint);
                const goWest = Path.goNextPoint(westPoint);

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
                // If cross, change direction
                if (marker.getValue() === constants.cross) {
                    // If not possible to go in same direction and cross is current point:
                    if (direction === Direction.north) {
                        if (eastPoint && goEast) {
                            pathPoints.push(eastPoint);
                            direction = Direction.east;
                            marker = eastPoint;
                        }
                        if (westPoint && goWest) {
                            pathPoints.push(westPoint);
                            direction = Direction.west;
                            marker = westPoint;
                        }
                    } else if (direction === Direction.east) {
                        if (northPoint && goNorth) {
                            pathPoints.push(northPoint);
                            direction = Direction.north;
                            marker = northPoint;
                        }
                        if (southPoint && goSouth) {
                            pathPoints.push(southPoint);
                            direction = Direction.south;
                            marker = southPoint;
                        }
                    } else if (direction === Direction.south) {
                        if (eastPoint && goEast) {
                            pathPoints.push(eastPoint);
                            direction = Direction.east;
                            marker = eastPoint;
                        }
                        if (westPoint && goWest) {
                            pathPoints.push(westPoint);
                            direction = Direction.west;
                            marker = westPoint;
                        }
                    } else if (direction === Direction.west) {
                        if (southPoint && goSouth) {
                            pathPoints.push(southPoint);
                            direction = Direction.south;
                            marker = southPoint;
                        }
                        if (northPoint && goNorth) {
                            pathPoints.push(northPoint);
                            direction = Direction.north;
                            marker = northPoint;
                        }
                    }
                } else
                if (direction === Direction.north && northPoint && goNorth) {
                    pathPoints.push(northPoint);
                    marker = northPoint;
                } else if (direction === Direction.east && eastPoint && goEast) {
                    pathPoints.push(eastPoint);
                    marker = eastPoint;
                } else if (direction === Direction.south && southPoint && goSouth) {
                    pathPoints.push(southPoint);
                    marker = southPoint;
                } else if (direction === Direction.west && westPoint && goWest) {
                    pathPoints.push(westPoint);
                    marker = westPoint;
                } else if (constants.alphabet.includes(marker.getValue())) {
                    // If not possible to go in same direction and letter is current point: check all directions except previous
                    if (northPoint && goNorth && pathPoints[i - 1] !== northPoint) {
                        pathPoints.push(northPoint);
                        direction = Direction.north;
                        marker = northPoint;
                    } else if (eastPoint && goEast && pathPoints[i - 1] !== eastPoint) {
                        pathPoints.push(eastPoint);
                        direction = Direction.east;
                        marker = eastPoint;
                    } else if (southPoint && goSouth && pathPoints[i - 1] !== southPoint) {
                        pathPoints.push(southPoint);
                        direction = Direction.south;
                        marker = southPoint;
                    } else if (westPoint && goWest && pathPoints[i - 1] !== westPoint) {
                        pathPoints.push(westPoint);
                        direction = Direction.west;
                        marker = westPoint;
                    }
                }
            }
            i++;
        }
        console.log(pathPoints);
        console.log('Letters: ' + this.collectLetters(pathPoints, constants.alphabet));
        console.log('Path as chars: ' + this.getPathAsChars(pathPoints));
    }

    /**
     * @private
     * @static
     * @param pathPoints Path points
     * @returns Is path end reached
     * @description Checks if path end is reached
     */
    private static isPathEndReached(pathPoints: AsciiMapPoint[]): boolean {
        return pathPoints.some((point: AsciiMapPoint) => point.getValue() === constants.pathEndChar)
    }

    /**
     * @private
     * @static
     * @param asciiMap ASCII map
     * @param asciiMapPoint ASCII map point
     * @returns North point
     * @description Returns north point
     */
    private static getNorthPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === (asciiMapPoint.getY() - 1)) && (point.getX() === asciiMapPoint.getX()));
    }

    /**
     * @private
     * @static
     * @param asciiMap ASCII map
     * @param asciiMapPoint ASCII map point
     * @returns East point
     * @description Returns east point
     */
    private static getEastPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === asciiMapPoint.getY()) && (point.getX() === (asciiMapPoint.getX() + 1)));
    }

    /**
     * @private
     * @static
     * @param asciiMap ASCII map
     * @param asciiMapPoint ASCII map point
     * @returns South point
     * @description Returns south point
     */
    private static getSouthPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === (asciiMapPoint.getY() + 1)) && (point.getX() === asciiMapPoint.getX()));
    }

    /**
     * @private
     * @static
     * @param asciiMap ASCII map
     * @param asciiMapPoint ASCII map point
     * @returns West point
     * @description Returns west point
     */
    private static getWestPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === asciiMapPoint.getY()) && (point.getX() === (asciiMapPoint.getX() - 1)));
    }

    /**
     * @private
     * @static
     * @param asciiMapPoint ASCII map point
     * @returns Should go next point
     * @description Checks if it is allowed to go to next point
     */
    private static goNextPoint(asciiMapPoint: AsciiMapPoint | undefined): boolean {
        if (constants.alphabet.includes(asciiMapPoint?.getValue() || '') ||
            asciiMapPoint?.getValue() === constants.cross ||
            asciiMapPoint?.getValue() === constants.pathEndChar ||
            asciiMapPoint?.getValue() === constants.verticalPath ||
            asciiMapPoint?.getValue() === constants.horizontalPath) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @private
     * @static
     * @param pathPoints Path points
     * @returns Path as chars
     * @description Retrieves path values and puts them into single path chars string
     */
    private static getPathAsChars(pathPoints: AsciiMapPoint[]): string {
        let pathAsChars: string = '';
        pathPoints.forEach((point: AsciiMapPoint) => {
            pathAsChars = pathAsChars.concat(point.getValue());
        });
        return pathAsChars;
    }

    /**
     * @private
     * @static
     * @param pathPoints Path points
     * @param alphabet Alphabet
     * @returns Letters
     * @description Collects letters
     */
    private static collectLetters(pathPoints: AsciiMapPoint[], alphabet: string[]): string {
        let letters: string = '';
        pathPoints.forEach((point: AsciiMapPoint) => {
            // Collect letters, but only if not collected already
            if (alphabet.includes(point.getValue()) && !letters.includes(point.getValue())) {
                letters = letters.concat(point.getValue());
            }
        });
        return letters;
    }

}
