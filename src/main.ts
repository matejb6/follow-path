import { map1 } from '../data/valid-maps';
import { constants } from './core/constants/constants';
import { AsciiMap } from './shared/map/ascii-map';
import { Path } from './shared/path/path';

class Main {
  /**
   * Main run method, entry point to program execution
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
