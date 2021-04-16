/**
 * @description Constants interface
 */
 export interface Constants {
    pathStartChar: string;
    pathEndChar: string;
    cross: string;
    horizontalPath: string;
    verticalPath: string;
    alphabet: string[];
}

/**
 * @description Direction enum
 */
export enum Direction {
    noDirection = 'noDirection',
    north = 'north',
    east = 'east',
    south = 'south',
    west = 'west'
}
