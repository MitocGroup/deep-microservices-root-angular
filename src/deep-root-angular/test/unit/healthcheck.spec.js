const chai = require('chai');

describe('Unit Health-check', () => {
  it('Test chai to be an object', () => {
    chai.expect(chai).to.be.an('object');
  });
});
