import { describe } from 'mocha';
import { expect } from 'chai';
import { AsciiMap } from '../../src/map/ascii-map';
import { Path } from '../../src/map/path';
import { validMaps } from '../../data/valid-maps';
import { validMapsLetters } from '../../data/valid-maps-letters';
import { validMapsPathAsChars } from '../../data/valid-maps-path-as-chars';
import { invalidMaps } from '../../data/invalid-maps';
import { constants } from '../../src/shared/constants';

describe('Acceptance test', () => {

    describe('collected letters', () => {
        validMaps.forEach((map: string, index: number) => {
            it('should have map collected letters', () => {
                const asciiMap = new AsciiMap(map);
                const path = new Path(asciiMap);
                expect(path.collectLetters(constants.alphabet)).to.equal(validMapsLetters[index]);
            });
        });
    });

    describe('path as chars', () => {
        validMaps.forEach((map: string, index: number) => {
            it('should have map path as chars', () => {
                const asciiMap = new AsciiMap(map);
                const path = new Path(asciiMap);
                expect(path.getPathAsString()).to.equal(validMapsPathAsChars[index]);
            });
        });
    });

    describe('invalid maps errors', () => {
        invalidMaps.forEach((map: string) => {
            it('should have map path as chars', () => {
                const asciiMap = new AsciiMap(map);
                expect(asciiMap.isMapValid(constants.pathStartChar, constants.pathEndChar)).to.equal(false);
            });
        });
    });

});
