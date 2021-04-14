import { AsciiMapPoint } from './acsii-map-point';

export class AsciiMap {

    /**
     * @type string
     * @description Map
     */
    private map: string;
    /**
     * @type AsciiMapPoint[]
     * @description ASCII map points
     */
    private asciiMapPoints: AsciiMapPoint[];

    constructor(map: string) {
        this.map = map;
        this.asciiMapPoints = this.createAsciiMapPoints();
    }

    /**
     * @public
     * @returns Map
     * @description Returns map
     */
    public getMap(): string {
        return this.map;
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
     * @param startPoint Start point
     * @param endPoint End point
     * @returns Is map valid
     * @description Checks if map is valid
     */
     public isMapValid(startPoint: string, endPoint: string): boolean {
        return this.getCharCount(startPoint) === 1 && this.getCharCount(endPoint) === 1;
    }

    /**
     * @private
     * @param char Character
     * @returns Character count
     * @description Returns character count
     */
    private getCharCount(char: string): number {
        let charCount = 0;
        for (let i = 0; i < this.map.length; i++) {
            if (char === this.map.charAt(i)) {
                charCount++;
            }
        }
        return charCount;
    }

    /**
     * @private
     * @param char Char
     * @returns Is end of row
     * @description Checks if end of row
     */
    private isEndOfRow(char: string): boolean {
        return !!(/\r|\n/.exec(char));
    }

    /**
     * @private
     * @returns ASCII map points
     * @description Creates ACSII map points
     */
    private createAsciiMapPoints(): AsciiMapPoint[] {
        const asciiMapPoints: AsciiMapPoint[] = [];
        let column: number = 0;
        let row: number = 0;
        for (let i = 0; i < this.map.length; i++) {
            // Create each ASCII map point with position and value
            const asciiMapPoint = new AsciiMapPoint(column, row, this.map.charAt(i));
            if (this.isEndOfRow(this.map.charAt(i))) {
                column = 0;
                row++;
            } else {
                column++;
                asciiMapPoints.push(asciiMapPoint);
            }
        }
        return asciiMapPoints;
    }
    
}
