import {assert} from 'chai';

import {test} from '../linter';

describe(`Check import`, () => {
  it(`should return test`, () => {
    assert.equal(test(), `test`);
  });
});
