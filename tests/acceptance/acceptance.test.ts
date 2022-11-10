import { AsciiMap } from '../../src/shared/map/ascii-map';
import { Path } from '../../src/shared/path/path';
import { validMaps } from '../../data/valid-maps';
import { validMapsLetters } from '../../data/valid-maps-letters';
import { validMapsPathAsChars } from '../../data/valid-maps-path-as-chars';
import { invalidMaps } from '../../data/invalid-maps';
import { constants } from '../../src/core/constants/constants';

describe('Acceptance test', () => {
  describe('collected letters', () => {
    validMaps.forEach((map: string, index: number) => {
      test('should have map collected letters', () => {
        const asciiMap = new AsciiMap(map);
        const path = new Path(asciiMap);
        expect(path.collectLetters(constants.alphabet)).toEqual(validMapsLetters[index]);
      });
    });
  });

  describe('path as chars', () => {
    validMaps.forEach((map: string, index: number) => {
      test('should have map path as chars', () => {
        const asciiMap = new AsciiMap(map);
        const path = new Path(asciiMap);
        expect(path.getPathAsString()).toEqual(validMapsPathAsChars[index]);
      });
    });
  });

  describe('invalid maps errors', () => {
    invalidMaps.forEach((map: string) => {
      test('should have map path as chars', () => {
        const asciiMap = new AsciiMap(map);
        expect(asciiMap.isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
      });
    });
  });
});
