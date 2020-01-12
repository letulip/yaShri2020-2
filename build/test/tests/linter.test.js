'use strict';

var chai = require('chai');

const test = () => {
  return `test`;
};

describe(`Check import`, () => {
  it(`should return test`, () => {
    chai.assert.equal(test(), `test`);
  });
});
