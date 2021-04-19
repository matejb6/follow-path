import { describe } from 'mocha';
import { expect } from 'chai';
import { AsciiMap } from '../../src/map/ascii-map';
import { constants } from '../../src/shared/constants';
import { map1 } from '../../data/valid-maps';
import { map6, map7, map8, map9, map10 } from '../../data/invalid-maps';

describe('Test AsciiMap class', () => {

    it('should have map', () => {
        expect(new AsciiMap(map1).getAsciiMap()).to.equal(map1);
    });

    it('should have map points', () => {
        const asciiMap = new AsciiMap(map1);
        // @ts-ignore
        const mapPoints = asciiMap.createAsciiMapPoints();
        expect(asciiMap.getAsciiMapPoints()).to.deep.equal(mapPoints);
    });

    it('should have valid map check', () => {
        expect(new AsciiMap(map1).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(true);
        expect(new AsciiMap(map6).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
        expect(new AsciiMap(map7).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
        expect(new AsciiMap(map8).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
        expect(new AsciiMap(map9).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
    });

    it('should have char count', () => {
        // @ts-ignore
        expect(new AsciiMap(map1).getCharCount(constants.pathStartChar)).to.equal(1);
        // @ts-ignore
        expect(new AsciiMap(map6).getCharCount(constants.pathStartChar)).to.equal(0);
        // @ts-ignore
        expect(new AsciiMap(map8).getCharCount(constants.pathStartChar)).to.equal(2);
    });

});
