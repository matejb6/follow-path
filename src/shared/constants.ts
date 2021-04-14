/**
 * @type Constants
 * @description Constants
 */
export const constants: Constants = {
    startAtChar: '@',
    endAtChar: 'x',
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    horizontalPath: '-',
    verticalPath: '|',
    cross: '+'
}

/**
 * @description Constants interface
 */
export interface Constants {
    startAtChar: string;
    endAtChar: string;
    alphabet: string[];
    horizontalPath: string;
    verticalPath: string;
    cross: string;
}
