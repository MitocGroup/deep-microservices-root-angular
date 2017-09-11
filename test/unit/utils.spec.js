'use strict';

const chai = require('chai');
const path = require('path');
const utils = require('../../src/deep-root-angular/utils');
const frontendPath = path.join(__dirname, '../../src/deep-root-angular/frontend');

describe('Check utils module', () => {
  it('Test utils to be an object', () => {
    chai.expect(utils).to.be.an('object');
  });

  it('Test utils.installMicroserviceDeps to be a function', () => {
    chai.expect(utils.installMicroserviceDeps).to.be.an('function');
  });

  it('Test utils.watchMicroservice to be a function', () => {
    chai.expect(utils.watchMicroservice).to.be.an('function');
  });

  it('Test utils.initializeApplication to be a function', () => {
    chai.expect(utils.initializeApplication).to.be.an('function');
  });

  it('Test utils.installMicroserviceDeps to be executable', done => {
    utils.installMicroserviceDeps(frontendPath, 'dev').then(res => {
      chai.expect(res).to.be.true;
      done();
    })
  }).timeout(60000);

  it('Test utils.watchMicroservice to be executable', done => {
    utils.watchMicroservice(frontendPath).then(res => {
      chai.expect(res).to.be.true;
      done();
    });
  });
});
