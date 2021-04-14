
import { constants } from '../shared/constants'
import { AsciiMap } from './ascii-map';
import { AsciiMapPoint } from './acsii-map-point';
import { Direction } from '../shared/definitions';

export class Path {

    public static collectLetters(asciiMap: AsciiMap): void {
        let direction: Direction;
        // Fint first point, the entry point
        const currentPoint: AsciiMapPoint | undefined = asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => point.getValue() === constants.startAtChar);

        while (currentPoint?.getValue() !== constants.endAtChar) {
            const points: AsciiMapPoint[] = [];
            if (currentPoint) {
                let northFromPoint = Path.checkNorthFromPoint(asciiMap, currentPoint);
                let eastFromPoint = Path.checkEastFromPoint(asciiMap, currentPoint);
                let southFromPoint = Path.checkSouthFromPoint(asciiMap, currentPoint);
                let westFromPoint = Path.checkWestFromPoint(asciiMap, currentPoint);
            }
        }
        // North, south: letter, +, |, x
        // East, west: letter, +, -, x
    }

    private static checkNorthFromPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === (asciiMapPoint.getY() - 1)) && (point.getX() === asciiMapPoint.getX()));
    }

    private static checkEastFromPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === asciiMapPoint.getY()) && (point.getX() === (asciiMapPoint.getX() + 1)));
    }

    private static checkSouthFromPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === (asciiMapPoint.getY() + 1)) && (point.getX() === asciiMapPoint.getX()));
    }

    private static checkWestFromPoint(asciiMap: AsciiMap, asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return asciiMap.getAsciiMapPoints().find((point: AsciiMapPoint) => (point.getY() === asciiMapPoint.getY()) && (point.getX() === (asciiMapPoint.getX() - 1)));
    }

}
