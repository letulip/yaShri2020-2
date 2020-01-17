import {assert} from 'chai';

import {
  checkTextH1Several,
  checkTextH2Position,
  checkTextH3Position
} from '../text';

const textH1SeveralContent = [
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h3"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  },
]

const textH1SeveralError = {
  "code": "TEXT.SEVERAL_H1",
  "error": "Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

const textH2PositionError = {
  "code": "TEXT.INVALID_H2_POSITION",
  "error": "Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

const textH3PositonError = {
  "code": "TEXT.INVALID_H3_POSITION",
  "error": "Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

describe(`Check h1 several function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkTextH1Several(textH1SeveralContent), textH1SeveralError);
  });
});

describe(`Check h2 position function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkTextH2Position(textH1SeveralContent), textH2PositionError);
  });
});

describe(`Check h3 position function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkTextH3Position(textH1SeveralContent), textH3PositonError);
  });
});