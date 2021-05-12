import { map1 } from '../data/valid-maps';
import { map10 } from '../data/invalid-maps';
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
        const testMap: string = map1;
        console.log('Software Sauna Code Challenge');
        console.log('');

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
            // Log collected letters and path as chars
            const path = new Path(asciiMap);
            console.log('Letters: ' + path.collectLetters(constants.alphabet));
            console.log('Path as characters: ' + path.getPathAsChars());
        }
    }

}

Main.run();
