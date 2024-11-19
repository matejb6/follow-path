import { MAP_1 } from '../data/valid-maps.ts';
import { AsciiMap } from './shared/map/ascii-map.ts';
import { Path } from './shared/path/path.ts';

class Main {
  /**
   * Main run method, entry point to program execution
   */
  public static run(): void {
    const testMap: string = MAP_1;
    console.log(`Follow Path Code Challenge\n\nASCII map\n${testMap}\n`);

    const asciiMap = new AsciiMap(testMap);
    const isMapValid = asciiMap.isMapValid();
    if (isMapValid) {
      const path = new Path(asciiMap);
      console.log(`Letters: ${path.collectLetters()}`);
      console.log(`Path as characters: ${path.getPathAsString()}`);
    } else {
      console.log('Map is invalid');
    }
  }
}

Main.run();
