import { map1, map2, map3, map4, map5 } from '../../data/valid-maps.ts';
import { invalidMap1, invalidMap2, invalidMap3, invalidMap4, invalidMap5 } from '../../data/invalid-maps.ts';
import { AsciiMap } from '../../src/shared/map/ascii-map.ts';
import { Path } from '../../src/shared/path/path.ts';

describe('Acceptance test', () => {
  describe('valid maps', () => {
    test('should mark a basic map as valid', () => {
      expect(new AsciiMap(map1).isMapValid()).toEqual(true);
    });
    test('should mark a map with go straight through intersections as valid', () => {
      expect(new AsciiMap(map2).isMapValid()).toEqual(true);
    });
    test('should mark a map with letters on turns as valid', () => {
      expect(new AsciiMap(map3).isMapValid()).toEqual(true);
    });
    test('should mark a map with intersections through letters as valid', () => {
      expect(new AsciiMap(map4).isMapValid()).toEqual(true);
    });
    test('should mark a compact map without space between letters and turns as valid', () => {
      expect(new AsciiMap(map5).isMapValid()).toEqual(true);
    });
  });

  describe('letter collection', () => {
    test('should collect letters in map 1', () => {
      const asciiMap = new AsciiMap(map1);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ACB');
    });
    test('should collect letters in map 2', () => {
      const asciiMap = new AsciiMap(map2);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ABCD');
    });
    test('should collect letters in map 3', () => {
      const asciiMap = new AsciiMap(map3);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ACB');
    });
    test('should collect letters in map 4', () => {
      const asciiMap = new AsciiMap(map4);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ABCD');
    });
    test('should collect letters in map 5', () => {
      const asciiMap = new AsciiMap(map5);
      const path = new Path(asciiMap);
      expect(path.collectLetters()).toEqual('ABCD');
    });
  });

  describe('path as characters', () => {
    test('should have path as characters in map 1', () => {
      const asciiMap = new AsciiMap(map1);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@---A---+|C|+---+|+-B-x');
    });
    test('should have path as characters in map 2', () => {
      const asciiMap = new AsciiMap(map2);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@|A+---B--+|+--C-+|-||+---D--+|x');
    });
    test('should have path as characters in map 3', () => {
      const asciiMap = new AsciiMap(map3);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@---A---+|||C---+|+-B-x');
    });
    test('should have path as characters in map 4', () => {
      const asciiMap = new AsciiMap(map4);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@--A-+|+-+|A|+--B--+C|+-+|+-C-+|D|x');
    });
    test('should have path as characters in map 5', () => {
      const asciiMap = new AsciiMap(map5);
      const path = new Path(asciiMap);
      expect(path.getPathAsString()).toEqual('@A+++A|+-B-+C+++C-+Dx');
    });
  });

  describe('invalid maps', () => {
    test('should mark a map without starting point as invalid', () => {
      expect(new AsciiMap(invalidMap1).isMapValid()).toEqual(false);
    });
    test('should mark a map without ending point as invalid', () => {
      expect(new AsciiMap(invalidMap2).isMapValid()).toEqual(false);
    });
    test('should mark a map with multiple starting points as invalid', () => {
      expect(new AsciiMap(invalidMap3).isMapValid()).toEqual(false);
    });
    test('should mark a map with multiple ending points as invalid', () => {
      expect(new AsciiMap(invalidMap4).isMapValid()).toEqual(false);
    });
    test('should mark a map with T fork as invalid', () => {
      expect(new AsciiMap(invalidMap5).isMapValid()).toEqual(false);
    });
  });
});
