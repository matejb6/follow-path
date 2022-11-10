import { AsciiMap } from './ascii-map';
import { constants } from '../shared/constants';
import { map1 } from '../../data/valid-maps';
import { map6 } from '../../data/invalid-maps';

describe('AsciiMap', () => {
  test('should have map points', () => {
    const asciiMap = new AsciiMap(map1);
    expect(asciiMap.mapPoints.length).toBeGreaterThan(0);
  });

  test('should check valid map', () => {
    expect(new AsciiMap(map1).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(true);
  });

  test('should check invalid map', () => {
    expect(new AsciiMap(map6).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
  });

  test('should check empty map as invalid', () => {
    expect(new AsciiMap('').isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
  });
});
