import {assert} from 'chai';

import {
  createErrorObject,
  findFirstElementIndex
} from '../common';

const testContent = [
  {
    "block": "placeholder",
    "mods": {
        "view": "primary",
        "size": "m"
    }
  },
  {
    "block": "text",
    "mods": {
      "size": "m"
    }
  },
  {
      "block": "text",
      "mods": {
        "size": "m"
      }
  },
  {
      "block": "text",
      "mods": {
        "size": "l"
      }
  },
  {
    "block": "button",
    "mods": {
      "size": "m"
    }
  }
];

describe(`Check error object creation`, () => {
  it(`should return propper error object`, () => {
    assert.isObject(createErrorObject());
  });
});

describe(`Check find first element index function`, () => {
  it(`should return proper index of element in array`, () => {
    assert.equal(findFirstElementIndex(testContent), -1);
    assert.equal(findFirstElementIndex(testContent, ``), -1);
    assert.equal(findFirstElementIndex(testContent, `text`), 1);
    assert.equal(findFirstElementIndex(testContent, `button`), 4);
  });
});

