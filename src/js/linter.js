const testSizeEqual = (textBlockArray) => {

  testBlockArray.forEach((block) => {
    
  });
};

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
