import { constants } from '../shared/constants';
import { Direction } from '../shared/definitions';
import { AsciiMapPoint } from './ascii-map-point';

export class AsciiMap {

    /**
     * @description ASCII map
     */
    private readonly asciiMap: string;
    /**
     * @description ASCII map points
     */
    private readonly asciiMapPoints: AsciiMapPoint[];

    constructor(asciiMap: string) {
        this.asciiMap = asciiMap;
        this.asciiMapPoints = this.createAsciiMapPoints();
    }

    /**
     * @param char Char
     * @returns Is end of row
     * @description Checks if end of row
     */
    private static isEndOfRow(char: string): boolean {
        return !!(/[\r\n]/.exec(char));
    }

    /**
     * @returns ASCII map
     * @description Returns ASCII map
     */
    public getAsciiMap(): string {
        return this.asciiMap;
    }

    /**
     * @returns ASCII map points
     * @description Returns ASCII map points
     */
    public getAsciiMapPoints(): AsciiMapPoint[] {
        return this.asciiMapPoints;
    }

    /**
     * @param asciiMapPoint ASCII map point
     * @returns Point surrounding points
     * @description Returns point surrounding points
     */
    public getPointSurroundingPoints(asciiMapPoint: AsciiMapPoint): Map<Direction, AsciiMapPoint | undefined> {
        const pointSurroundingPoints: Map<Direction, AsciiMapPoint | undefined> = new Map<Direction, AsciiMapPoint | undefined>();
        pointSurroundingPoints.set(Direction.north, this.getNorthPoint(asciiMapPoint));
        pointSurroundingPoints.set(Direction.east, this.getEastPoint(asciiMapPoint));
        pointSurroundingPoints.set(Direction.south, this.getSouthPoint(asciiMapPoint));
        pointSurroundingPoints.set(Direction.west, this.getWestPoint(asciiMapPoint));
        return pointSurroundingPoints;
    }

    /**
     * @param pathStartChar Path start char
     * @param pathEndChar Path end char
     * @returns Is map valid
     * @description Checks if map is valid
     */
    public isMapValid(pathStartChar: string, pathEndChar: string): boolean {
        return this.getCharCount(pathStartChar) === 1 && this.getCharCount(pathEndChar) === 1 && !this.hasTFork();
    }

    /**
     * @param char Character
     * @returns Character count
     * @description Returns character count
     */
    private getCharCount(char: string): number {
        let charCount = 0;
        for (let i = 0; i < this.asciiMap.length; i++) {
            if (char === this.asciiMap.charAt(i)) {
                charCount++;
            }
        }
        return charCount;
    }

    /**
     * @returns Has T fork
     * @description Checks if map has T fork, finds cross points and checks if there are multiple horizontal and vertical paths
     */
    private hasTFork(): boolean {
        let hasTFork = false;
        const crossPoints: AsciiMapPoint[] = this.asciiMapPoints.filter((asciiMapPoint: AsciiMapPoint) => asciiMapPoint.getValue() === constants.cross);
        crossPoints.forEach((crossPoint: AsciiMapPoint) => {
            const surroundPointsValues = [];
            const surroundPoints = this.getPointSurroundingPoints(crossPoint);
            for (const value of surroundPoints.values()) {
                surroundPointsValues.push(value?.getValue());
            }
            const horizontalPathCount: number = surroundPointsValues.filter(value => value === constants.horizontalPath).length;
            const verticalPathCount: number = surroundPointsValues.filter(value => value === constants.verticalPath).length;
            if ((horizontalPathCount >= 2 && verticalPathCount >= 1) || (horizontalPathCount >= 1 && verticalPathCount >= 2)) {
                hasTFork = true;
            }
        });
        return hasTFork;
    }

    /**
     * @returns ASCII map points
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
     * @param asciiMapPoint ASCII map point
     * @returns North point
     * @description Returns north point
     */
    private getNorthPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return this.asciiMapPoints.find((point: AsciiMapPoint) => (point.getY() === (asciiMapPoint.getY() - 1)) && (point.getX() === asciiMapPoint.getX()));
    }

    /**
     * @param asciiMapPoint ASCII map point
     * @returns East point
     * @description Returns east point
     */
    private getEastPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return this.asciiMapPoints.find((point: AsciiMapPoint) => (point.getY() === asciiMapPoint.getY()) && (point.getX() === (asciiMapPoint.getX() + 1)));
    }

    /**
     * @param asciiMapPoint ASCII map point
     * @returns South point
     * @description Returns south point
     */
    private getSouthPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return this.asciiMapPoints.find((point: AsciiMapPoint) => (point.getY() === (asciiMapPoint.getY() + 1)) && (point.getX() === asciiMapPoint.getX()));
    }

    /**
     * @param asciiMapPoint ASCII map point
     * @returns West point
     * @description Returns west point
     */
    private getWestPoint(asciiMapPoint: AsciiMapPoint): AsciiMapPoint | undefined {
        return this.asciiMapPoints.find((point: AsciiMapPoint) => (point.getY() === asciiMapPoint.getY()) && (point.getX() === (asciiMapPoint.getX() - 1)));
    }

}
