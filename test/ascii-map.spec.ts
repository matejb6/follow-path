import { describe } from 'mocha';
import { expect } from 'chai';
import { AsciiMap } from '../src/map/ascii-map';
import { constants } from '../src/shared/constants';
import { map1 } from '../data/data';

describe('Test AsciiMap class', () => {

    const testMap: string = map1;
    const invlidTestMap1: string = '@-AB-CD-';
    const invlidTestMap2: string = '-AB-CD-x';
    const invlidTestMap3: string = '@-AB-xCD-x';
    const invlidTestMap4: string = '@-AB-@CD-x';

    it('should have map', () => {
        expect(new AsciiMap(testMap).getMap()).to.equal(testMap);
    });

    it('should have map points', () => {
        const asciiMap = new AsciiMap(testMap);
        // @ts-ignore
        const mapPoints = asciiMap.createAsciiMapPoints();
        expect(asciiMap.getAsciiMapPoints()).to.deep.equal(mapPoints);
    });

    it('should have valid map check', () => {
        expect(new AsciiMap(testMap).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(true);
        expect(new AsciiMap(invlidTestMap1).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
        expect(new AsciiMap(invlidTestMap2).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
        expect(new AsciiMap(invlidTestMap3).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
        expect(new AsciiMap(invlidTestMap4).isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
    });

    it('should have char count', () => {
        // @ts-ignore
        expect(new AsciiMap(testMap).getCharCount(constants.pathStartChar)).to.equal(1);
        // @ts-ignore
        expect(new AsciiMap(invlidTestMap2).getCharCount(constants.pathStartChar)).to.equal(0);
        // @ts-ignore
        expect(new AsciiMap(invlidTestMap4).getCharCount(constants.pathStartChar)).to.equal(2);
    });

});
