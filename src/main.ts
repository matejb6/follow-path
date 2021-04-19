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

import { map1, map2, map3, map4, map5 } from './data/data';
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

        const testMaps: string[] = [];
        testMaps.push(map1);
        testMaps.push(map2);
        testMaps.push(map3);
        testMaps.push(map4);
        testMaps.push(map5);

        testMaps.forEach((testMap: string) => {
            console.log('ASCII map');
            console.log(testMap);
            console.log('');

            // Create ASCII map
            const asciiMap = new AsciiMap(testMap);
            // Check is map is valid and stop execution if invalid
            if (!asciiMap.isMapValid(constants.pathStartChar, constants.pathEndChar)) {
                console.log('Error');
                return;
            } else {
                Path.followPath(asciiMap);
            }
        });
    }

}

Main.run();
