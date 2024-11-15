import { map1 } from '../../../data/valid-maps.ts';
import { invalidMap1 } from '../../../data/invalid-maps.ts';
import { AsciiMap } from './ascii-map.ts';

describe('AsciiMap', () => {
  test('should have map points', () => {
    expect(new AsciiMap(map1).mapPoints.length).toBeGreaterThan(0);
  });

  test('should mark map as valid', () => {
    expect(new AsciiMap(map1).isMapValid()).toEqual(true);
  });

  test('should mark map as invalid', () => {
    expect(new AsciiMap(invalidMap1).isMapValid()).toEqual(false);
  });

  test('should mark empty map as invalid', () => {
    expect(new AsciiMap('').isMapValid()).toEqual(false);
  });
});
