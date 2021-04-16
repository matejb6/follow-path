
import { constants } from '../shared/constants'
import { AsciiMap } from './ascii-map';
import { AsciiMapPoint } from './acsii-map-point';
import { Direction } from '../shared/definitions';

export class Path {

    /**
     * @public
     * @static
     * @param asciiMap ASCII map
     * @description Finds map start point and goes alogn path until end point
     */
    public static followPath(asciiMap: AsciiMap): void {
        const pathPoints: AsciiMapPoint[] = [];
        let direction: Direction = Direction.noDirection;
        // Find first point, the entry point
        let marker: AsciiMapPoint | undefined = asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => point.getValue() === constants.pathStartChar);
        if (marker) {
            pathPoints.push(marker);
        }

        let i = 0;
        while (!pathPoints.some((point: AsciiMapPoint) => point.getValue() === constants.pathEndChar) && i <= asciiMap.getAsciiMapPoints().length) {
            if (marker) {
                // Reset direction
                direction = marker.getValue() === constants.cross || constants.alphabet.includes(marker.getValue()) ? Direction.noDirection : direction;
                const northPoint = Path.getNorthPoint(asciiMap, marker);
                const eastPoint = Path.getEastPoint(asciiMap, marker);
                const southPoint = Path.getSouthPoint(asciiMap, marker);
                const westPoint = Path.getWestPoint(asciiMap, marker);

                const goNorth = Path.goNextPoint(northPoint, Direction.north);
                const goEast = Path.goNextPoint(eastPoint, Direction.east);
                const goSouth = Path.goNextPoint(southPoint, Direction.south);
                const goWest = Path.goNextPoint(westPoint, Direction.west);

                if ((direction === Direction.noDirection || direction === Direction.north) && northPoint && goNorth && !pathPoints.includes(northPoint)) {
                    pathPoints.push(northPoint);
                    direction = Direction.north;
                    marker = northPoint;
                } else if ((direction === Direction.noDirection || direction === Direction.east) && eastPoint && goEast && !pathPoints.includes(eastPoint)) {
                    pathPoints.push(eastPoint);
                    direction = Direction.east;
                    marker = eastPoint;
                } else if ((direction === Direction.noDirection || direction === Direction.south) && southPoint && goSouth && !pathPoints.includes(southPoint)) {
                    pathPoints.push(southPoint);
                    direction = Direction.south;
                    marker = southPoint;
                } else if ((direction === Direction.noDirection || direction === Direction.west) && westPoint && goWest && !pathPoints.includes(westPoint)) {
                    pathPoints.push(westPoint);
                    direction = Direction.west;
                    marker = westPoint;
                }
            }
            i++;
        }
        console.log(pathPoints);
        console.log('Path as chars: ' + this.getPathAsChars(pathPoints));
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
     * @param direction Direction
     * @returns Next point
     * @description Checks if it is allowed to go to next point
     */
    private static goNextPoint(asciiMapPoint: AsciiMapPoint | undefined, direction: Direction): boolean {
        if (constants.alphabet.includes(asciiMapPoint?.getValue() || '')) {
            return true;
        } else if (asciiMapPoint?.getValue() === constants.cross) {
            return true;
        } else if (asciiMapPoint?.getValue() === constants.pathEndChar) {
            return true;
        } else if ((direction === Direction.north || direction === Direction.south) && asciiMapPoint?.getValue() === constants.verticalPath) {
            return true;
        } else if ((direction === Direction.east || direction === Direction.west) && asciiMapPoint?.getValue() === constants.horizontalPath) {
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

}
