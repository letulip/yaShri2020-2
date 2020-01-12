'use strict';

var chai = require('chai');

const objectDestruct = (object) => {
  if (object.block) {
    console.log(`block name: ${object.block}`);
  }

  if (object.content) {
    object.content.forEach((contentElement) => {
      
      // if (contentElement) {
      //   console.log(contentElement);
      // }

      if (contentElement.elem) {
        console.log(`element name: ${contentElement.elem}`);
      }

      if (typeof contentElement === `object`) {
        objectDestruct(contentElement);
      }
    });
  } 

  if (object.mods) {
    // objectDestruct(object.mods);
    console.log(object.mods);
  }
  
};

const warningTest = (warningBlock) => {
  const object = JSON.parse(warningBlock);

  objectDestruct(object);
  // console.log(object);
  // console.log(object.block);
  // console.log(object.content);
  
  return [];
};

const warningJson = `{
  "block": "warning",
  "content": [
      {
          "block": "placeholder",
          "mods": { "size": "m" }
      },
      {
          "elem": "content",
          "content": [
              {
                  "block": "text",
                  "mods": { "size": "m" }
              },
              {
                  "block": "text",
                  "mods": { "size": "l" }
              }
          ]
      }
  ]
}`;

const warningResult = [
  {
      "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
      "error": "Тексты в блоке warning должны быть одного размера",
      "location": {
          "start": { "column": 1, "line": 1 },
          "end": { "column": 2, "line": 22 }
      }
  }
];

describe(`Check warning.json test`, () => {
  it(`should return equal warning test result`, () => {
    chai.assert.equal(warningTest(warningJson), warningResult);
  });
});
