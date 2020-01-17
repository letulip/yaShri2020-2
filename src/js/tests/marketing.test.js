import {assert} from 'chai';

import {
  checkMarketingBlocks,
} from '../marketing';

const gridCorrectToCheck = {
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
}

const gridErrorToCheck = {
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "5"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "3"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
};

const tooMuchMarketingError = {
  "code": "GRID.TOO_MUCH_MARKETING_BLOCKS",
  "error": "Маркетинговые блоки занимают не больше половины от всех колонок блока grid",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

describe(`Check too much marketing function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkMarketingBlocks(gridErrorToCheck.content, gridCorrectToCheck.mods["m-columns"]), tooMuchMarketingError);
  });
  it(`should return undefined`, () => {
    assert.equal(checkMarketingBlocks(gridCorrectToCheck.content, gridCorrectToCheck.mods["m-columns"]), undefined);
  });
});