import { map1 } from '../data/valid-maps';
import { constants } from './shared/constants'
import { AsciiMap } from './map/ascii-map';
import { Path } from './map/path';

class Main {

    public static run(): void {
        const testMap: string = map1;
        console.log(`Software Sauna Code Challenge\n\nASCII map\n${testMap}\n`);

        const asciiMap = new AsciiMap(testMap);
        const isMapValid = asciiMap.isMapValid(constants.pathStartChar, constants.pathEndChar);
        if (isMapValid) {
            const path = new Path(asciiMap);
            console.log(`Letters: ${path.collectLetters(constants.alphabet)}`);
            console.log(`Path as characters: ${path.getPathAsChars()}`);
        } else {
            console.log('Map is invalid');
        }
    }

}

Main.run();
