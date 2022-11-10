import { AsciiMap } from './ascii-map';
import { constants } from '../shared/constants';
import { map1 } from '../../data/valid-maps';
import { map6, map7, map8, map9, map10 } from '../../data/invalid-maps';

describe('AsciiMap', () => {
  test('should have map', () => {
    expect(new AsciiMap(map1).getAsciiMap()).toEqual(map1);
  });

  test('should have map points', () => {
    const asciiMap = new AsciiMap(map1);
    expect(asciiMap.getAsciiMapPoints().length).toBeGreaterThan(0);
  });

  test('should have valid map check', () => {
    expect(new AsciiMap(map1).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(true);
    expect(new AsciiMap(map6).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
    expect(new AsciiMap(map7).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
    expect(new AsciiMap(map8).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
    expect(new AsciiMap(map9).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
    expect(new AsciiMap(map10).isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
    expect(new AsciiMap('').isMapValid(constants.pathStartChar, constants.pathEndChar)).toEqual(false);
  });
});
