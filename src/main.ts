/**
 * README.md
 * 
 * About
 * Software Sauna Code Callenge
 * 
 * Prerequisites
 * install latest node.js 14.x
 * check if node and npm is installed
 * 
 * Start
 * run 'npm install' to install deps
 * run 'npm start' in project root directory
 * 
 */

import { data } from './data/data';
import { constants } from './shared/constants'
import { AsciiMap } from './map/ascii-map';
import { Path } from './map/path';

class Main {

    /**
     * @public
     * @static
     * @description Main class run method, used to sructure main running code
     */
    public static run(): void {
        console.log('Software Sauna Code Challenge');
        console.log('');

        const testMap: string = data;

        console.log('Map');
        console.log(testMap);
        console.log('');

        const startPoint: string = constants.startAtChar;
        const endPoint: string = constants.endAtChar;

        // Create ASCII map
        const asciiMap = new AsciiMap(testMap);
        // Check is map is valid and stop execution if invalid
        if (!asciiMap.isMapValid(startPoint, endPoint)) {
            console.log('Error');
            return;
        }

        Path.collectLetters(asciiMap);
    }

}

Main.run();
