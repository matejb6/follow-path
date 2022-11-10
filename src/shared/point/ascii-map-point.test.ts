import { AsciiMapPoint } from './ascii-map-point';

describe('AsciiMapPoint', () => {
  let asciiMapPoint: AsciiMapPoint;

  beforeEach(() => {
    asciiMapPoint = new AsciiMapPoint(1, 2, 'A');
  });

  test('should have coordinate X', () => {
    expect(asciiMapPoint.x).toEqual(1);
  });

  test('should have coordinate Y', () => {
    expect(asciiMapPoint.y).toEqual(2);
  });

  test('should have value', () => {
    expect(asciiMapPoint.value).toEqual('A');
  });
});
