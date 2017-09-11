const chai = require('chai');
const utils = require('../../src/deep-root-angular/utils');

describe('Check utils module', () => {
  it('Test utils to be an object', () => {
    chai.expect(utils).to.be.an('object');
  });

  it('Test utils.installNodeModules to be a function', () => {
    chai.expect(utils.installNodeModules).to.be.an('function');
  });

  it('Test utils.watchMicroservice to be a function', () => {
    chai.expect(utils.watchMicroservice).to.be.an('function');
  });

  it('Test utils.initializeApplication to be a function', () => {
    chai.expect(utils.initializeApplication).to.be.an('function');
  });
});
