import { MAP_1, MAP_2, MAP_3, MAP_4, MAP_5 } from '../../data/valid-maps.ts';
import { INVALID_MAP_1, INVALID_MAP_2, INVALID_MAP_3, INVALID_MAP_4, INVALID_MAP_5 } from '../../data/invalid-maps.ts';
import { AsciiMap } from '../../src/shared/map/ascii-map.ts';
import { Path } from '../../src/shared/path/path.ts';

describe('Acceptance test', () => {
  describe('valid maps', () => {
    test('should mark a basic map as valid', () => {
      expect(new AsciiMap(MAP_1).isMapValid()).toEqual(true);
    });
    test('should mark a map with go straight through intersections as valid', () => {
      expect(new AsciiMap(MAP_2).isMapValid()).toEqual(true);
    });
    test('should mark a map with letters on turns as valid', () => {
      expect(new AsciiMap(MAP_3).isMapValid()).toEqual(true);
    });
    test('should mark a map with intersections through letters as valid', () => {
      expect(new AsciiMap(MAP_4).isMapValid()).toEqual(true);
    });
    test('should mark a compact map without space between letters and turns as valid', () => {
      expect(new AsciiMap(MAP_5).isMapValid()).toEqual(true);
    });
  });

  describe('letter collection', () => {
    test('should collect letters in map 1', () => {
      const asciiMap = new AsciiMap(MAP_1);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ACB');
    });
    test('should collect letters in map 2', () => {
      const asciiMap = new AsciiMap(MAP_2);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ABCD');
    });
    test('should collect letters in map 3', () => {
      const asciiMap = new AsciiMap(MAP_3);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ACB');
    });
    test('should collect letters in map 4', () => {
      const asciiMap = new AsciiMap(MAP_4);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ABCD');
    });
    test('should collect letters in map 5', () => {
      const asciiMap = new AsciiMap(MAP_5);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ABCD');
    });
  });

  describe('path as characters', () => {
    test('should have path as characters in map 1', () => {
      const asciiMap = new AsciiMap(MAP_1);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@---A---+|C|+---+|+-B-x');
    });
    test('should have path as characters in map 2', () => {
      const asciiMap = new AsciiMap(MAP_2);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@|A+---B--+|+--C-+|-||+---D--+|x');
    });
    test('should have path as characters in map 3', () => {
      const asciiMap = new AsciiMap(MAP_3);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@---A---+|||C---+|+-B-x');
    });
    test('should have path as characters in map 4', () => {
      const asciiMap = new AsciiMap(MAP_4);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@--A-+|+-+|A|+--B--+C|+-+|+-C-+|D|x');
    });
    test('should have path as characters in map 5', () => {
      const asciiMap = new AsciiMap(MAP_5);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@A+++A|+-B-+C+++C-+Dx');
    });
  });

  describe('invalid maps', () => {
    test('should mark a map without starting point as invalid', () => {
      expect(new AsciiMap(INVALID_MAP_1).isMapValid()).toEqual(false);
    });
    test('should mark a map without ending point as invalid', () => {
      expect(new AsciiMap(INVALID_MAP_2).isMapValid()).toEqual(false);
    });
    test('should mark a map with multiple starting points as invalid', () => {
      expect(new AsciiMap(INVALID_MAP_3).isMapValid()).toEqual(false);
    });
    test('should mark a map with multiple ending points as invalid', () => {
      expect(new AsciiMap(INVALID_MAP_4).isMapValid()).toEqual(false);
    });
    test('should mark a map with T fork as invalid', () => {
      expect(new AsciiMap(INVALID_MAP_5).isMapValid()).toEqual(false);
    });
  });
});
