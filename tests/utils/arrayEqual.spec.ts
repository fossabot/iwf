import { describe, it } from 'mocha';
import { expect } from 'chai';
import arrayEqual, { arrayEqualWith } from '../../src/utils/arrayEqual';

const arrayOfABC = ['a', 'b', 'c'];
const arrayOfADB = ['a', 'd', 'b'];
const anotherArrayOfABC = ['a', 'b', 'c'];
const arrayOfABCD = ['a', 'b', 'c', 'd'];

describe('equal functions', () => {
    describe('arrayEqual', () => {
        describe('equals', () => {
            it('should equal if the contents are equal have the same pointer', () => {
                expect(arrayEqual(arrayOfABC, arrayOfABC)).to.be.true;
            });
            it('should equal if the contents are equal but not the same pointer', () => {
                expect(arrayEqual(arrayOfABC, anotherArrayOfABC)).to.be.true;
            });
        });

        describe('not equals', () => {
            it('should not equal if on of them is null', () => {
                // @ts-expect-error for the test
                expect(arrayEqual(null, arrayOfABC)).to.be.false;
                // @ts-expect-error for the test
                expect(arrayEqual(arrayOfABC, null)).to.be.false;
            });
            it('should not equal if on of them is undefined', () => {
                expect(arrayEqual(undefined, arrayOfABC)).to.be.false;
                // eslint-disable-next-line unicorn/no-useless-undefined
                expect(arrayEqual(arrayOfABC, undefined)).to.be.false;
            });
            it('should not equal if the length is different', () => {
                expect(arrayEqual(arrayOfABC, arrayOfABCD)).to.be.false;
            });
            it('should not equal if the contents are different', () => {
                expect(arrayEqual(arrayOfABC, arrayOfADB)).to.be.false;
            });
        });
    });

    describe('arrayEqualWith', () => {
        describe('equals', () => {
            it('should equal if the contents are equal have the same pointer', () => {
                expect(arrayEqualWith(arrayOfABC, arrayOfABC, (a, b) => a === b)).to.be.true;
            });
            it('should equal if the contents are equal but not the same pointer', () => {
                expect(arrayEqualWith(arrayOfABC, anotherArrayOfABC, (a, b) => a === b)).to.be.true;
            });
        });

        describe('not equals', () => {
            it('should not equal if on of them is null', () => {
                // @ts-expect-error for the test
                expect(arrayEqualWith(null, arrayOfABC, (a, b) => a === b)).to.be.false;
                // @ts-expect-error for the test
                expect(arrayEqualWith(arrayOfABC, null, (a, b) => a === b)).to.be.false;
            });
            it('should not equal if on of them is undefined', () => {
                expect(arrayEqualWith(undefined, arrayOfABC, (a, b) => a === b)).to.be.false;
                // eslint-disable-next-line unicorn/no-useless-undefined
                expect(arrayEqualWith(arrayOfABC, undefined, (a, b) => a === b)).to.be.false;
            });
            it('should not equal if the length is different', () => {
                expect(arrayEqualWith(arrayOfABC, arrayOfABCD, (a, b) => a === b)).to.be.false;
            });
            it('should not equal if the contents are different', () => {
                expect(arrayEqualWith(arrayOfABC, arrayOfADB, (a, b) => a === b)).to.be.false;
            });
        });

        it('should equal with the function', () => {
            expect(arrayEqualWith(arrayOfABC, anotherArrayOfABC, (a, b) => a === b)).to.be.true;
        });
        it('should equal with this wrong function', () => {
            expect(arrayEqualWith(arrayOfABC, anotherArrayOfABC, (a, b) => a !== b)).to.be.false;
        });
    });
});
