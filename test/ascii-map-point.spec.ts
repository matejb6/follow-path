import { describe } from 'mocha';
import { expect } from 'chai';
import { AsciiMapPoint } from '../src/map/ascii-map-point';

describe('Test AsciiMapPoint class', () => {

    let asciiMapPoint: AsciiMapPoint;

    beforeEach(() => {
        asciiMapPoint = new AsciiMapPoint(1, 2, 'A');
    });

    it('should have position', () => {
        expect(asciiMapPoint.getX()).to.equal(1);
        expect(asciiMapPoint.getY()).to.equal(2);
    });

    it('should have value', () => {
        expect(asciiMapPoint.getValue()).to.equal('A');
    });

});
