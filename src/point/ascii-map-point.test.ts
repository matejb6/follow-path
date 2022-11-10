import { AsciiMapPoint } from './ascii-map-point';

describe('AsciiMapPoint', () => {
  let asciiMapPoint: AsciiMapPoint;

  beforeEach(() => {
    asciiMapPoint = new AsciiMapPoint(1, 2, 'A');
  });

  test('should have position', () => {
    expect(asciiMapPoint.getX()).toEqual(1);
    expect(asciiMapPoint.getY()).toEqual(2);
  });

  test('should have value', () => {
    expect(asciiMapPoint.getValue()).toEqual('A');
  });
});
