import { beforeEach, describe, it, before, after } from 'mocha';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import qs from 'qs';
import sinon, { SinonStub } from 'sinon';
import upload, { validateAuthentication } from '../../src/tools/upload';
import { Item } from '../../src';
import { Token } from '../../src/tools/token';

chai.use(chaiAsPromised);
const {expect} = chai;

const token: Token = {
    token: 'token',
    cookie: 'cookie'
}

describe('upload', () => {
    let axiosStub: SinonStub;
    const item = Item.fromNothing();

    before(() => {
        axiosStub = sinon.stub(axios, 'post').resolves(Promise.resolve({
            data: {
                entity: Item.fromNothing().toJSON(),
                success: 1
            }
        }));
    });

    beforeEach(() => {
        axiosStub.resetHistory();
    });

    after(() => {
        axiosStub.restore();
    });

    describe('uploading', () => {
        it('should use the anonymous key if there is no key, but the anonymous key is set', async () => {
            await upload(item, {
                summary: 'Upload summary',
                tags: [''],
                anonymous: true
            });

            expect(axiosStub.calledOnce).to.true;

            const arguments_ = axiosStub.getCall(0).args[1];

            const data = qs.parse(arguments_);
            expect(data.token).to.equal('+\\');
            expect(data.summary).to.equal('Upload summary');
            expect(data.tags).to.equal('');
        });

        it('throw when uploading does not succeeds', async () => {
            axiosStub.returns({
                data: {
                    error: 'something went wrong'
                }
            });

            expect(upload(item, {
                summary: 'Upload summary',
                tags: [''],
                anonymous: true
            })).to.eventually.throw();
        });
    });

    describe('validateAuthentication', () => {
        describe('unknown', () => {
            it('should throw if anonymous key not set but there is no other auth method', () => {
                expect(
                    () => validateAuthentication({
                        summary: 'Upload summary',
                        tags: ['']
                    })
                ).to.throw();
            });
        });

        describe('authToken', () => {
            it('should you provide a correct authToken it should return the correct authMethod ', () => {
                expect(
                    validateAuthentication({
                        summary: 'Upload summary',
                        tags: [''],
                        authToken: token
                    })
                ).to.equal('authToken');
            });
        });

        describe('anonymous', () => {
            it('should throw if a authToken is available but the anonymous key is set', () => {
                expect(
                    () => validateAuthentication({
                        summary: 'Upload summary',
                        tags: [''],
                        authToken: token,
                        anonymous: true
                    })
                ).to.throw();
            });
        });
    });
});
