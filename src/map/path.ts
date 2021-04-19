
import { constants } from '../shared/constants'
import { AsciiMap } from './ascii-map';
import { AsciiMapPoint } from './ascii-map-point';
import { Direction } from '../shared/definitions';

export class Path {

    /**
     * @private
     * @type AsciiMapPoint[]
     * @description Path points
     */
    private pathPoints: AsciiMapPoint[];

    constructor(asciiMap: AsciiMap) {
        this.pathPoints = this.findPathPoints(asciiMap);
    }

    /**
     * @public
     * @returns Path points
     * @description Returns path points
     */
    public getPathPoints(): AsciiMapPoint[] {
        return this.pathPoints;
    }

    /**
     * @public
     * @returns Path as chars
     * @description Retrieves path values and puts them into single path chars string
     */
    public getPathAsChars(): string {
        let pathAsChars: string = '';
        this.pathPoints.forEach((point: AsciiMapPoint) => {
            pathAsChars = pathAsChars.concat(point.getValue());
        });
        return pathAsChars;
    }

    /**
     * @public
     * @param alphabet Alphabet
     * @returns Letters
     * @description Collects letters
     */
    public collectLetters(alphabet: string[]): string {
        let letters: string = '';
        this.pathPoints.forEach((point: AsciiMapPoint) => {
            // Collect letters, but only if not collected already
            if (alphabet.includes(point.getValue()) && !letters.includes(point.getValue())) {
                letters = letters.concat(point.getValue());
            }
        });
        return letters;
    }

    /**
     * @private
     * @param asciiMap ASCII map
     * @returns Path points
     * @description Finds map start point and goes along path until end point
     */
    private findPathPoints(asciiMap: AsciiMap): AsciiMapPoint[] {
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
                const northPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.north);
                const eastPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.east);
                const southPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.south);
                const westPoint = asciiMap.getPointSurroundingPoints(marker).get(Direction.west);

                const goNorth = this.goNextPoint(northPoint);
                const goEast = this.goNextPoint(eastPoint);
                const goSouth = this.goNextPoint(southPoint);
                const goWest = this.goNextPoint(westPoint);

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
                } else if (direction === Direction.north && northPoint && goNorth) {
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
        return pathPoints;
    }

    /**
     * @private
     * @param pathPoints Path points
     * @returns Is path end reached
     * @description Checks if path end is reached
     */
    private isPathEndReached(pathPoints: AsciiMapPoint[]): boolean {
        return pathPoints.some((point: AsciiMapPoint) => point.getValue() === constants.pathEndChar)
    }

    /**
     * @private
     * @param asciiMapPoint ASCII map point
     * @returns Should go next point
     * @description Checks if it is allowed to go to next point
     */
    private goNextPoint(asciiMapPoint: AsciiMapPoint | undefined): boolean {
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

}
