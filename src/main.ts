import { map1 } from '../data/valid-maps';
import { constants } from './shared/constants';
import { AsciiMap } from './map/ascii-map';
import { Path } from './path/path';

class Main {
  /**
   * @public
   * @static
   * @description Main run method, entry point to program execution
   */
  public static run(): void {
    const testMap: string = map1;
    console.log(`Follow Path Code Challenge\n\nASCII map\n${testMap}\n`);

    const asciiMap = new AsciiMap(testMap);
    const isMapValid = asciiMap.isMapValid(constants.pathStartChar, constants.pathEndChar);
    if (isMapValid) {
      const path = new Path(asciiMap);
      console.log(`Letters: ${path.collectLetters(constants.alphabet)}`);
      console.log(`Path as characters: ${path.getPathAsString()}`);
    } else {
      console.log('Map is invalid');
    }
  }
}

Main.run();
