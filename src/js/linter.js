let column = 0

let errors = [];

const checkTextBlocksSizeEquality = (object) => {
  const contents = object.content[1].content;
  for (let block = 0; block < contents.length - 1; block++) {
    if (contents[block].mods.size !== contents[block + 1].mods.size) {
      return console.log(`WARNING.TEXT_SIZES_SHOULD_BE_EQUAL`);
    }
  }
};

const objectDestruct = (object) => {

  if (object.block) {
    console.log(`column: ${column} block name: ${object.block}`);

    if (object.block === `warning`) {
      checkTextBlocksSizeEquality(object);
    }
  }

  if (object.content) {
    column += 1;
    console.log(`block content:`);
    object.content.forEach((contentElement) => {
      
      // if (contentElement) {
      //   console.log(contentElement);
      // }

      if (contentElement.elem) {
        console.log(`column: ${column} element name: ${contentElement.elem}`);
      }

      if (typeof contentElement === `object`) {
        objectDestruct(contentElement);
      }
    });
  } 

  if (object.mods) {
    console.log(`block mods:`);
    // objectDestruct(object.mods);
    console.log(object.mods);
  }
  
}

const warningTest = (warningBlock) => {
  const object = JSON.parse(warningBlock);

  objectDestruct(object);
  // console.log(object);
  // console.log(object.block);
  // console.log(object.content);
  
  return [];
};

export {warningTest};
