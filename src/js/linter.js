const WARNING_CODE = `WARNING.`;
const TEXT_SIZE_CODE = `TEXT_SIZES_SHOULD_BE_EQUAL`;
const TEXT_SIZE_ERROR = `Тексты в блоке warning должны быть одного размера`;
const BUTTON_SIZE_CODE = `INVALID_BUTTON_SIZE`;
const BUTTON_SIZE_ERROR = `Размер кнопки блока warning должен быть на 1 шаг больше эталонного`;
const BUTTON_POSITION_CODE = `INVALID_BUTTON_POSITION`;
const BUTTON_POSITION_ERROR = `Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности`;
const PLACEHOLDER_SIZE_CODE = `INVALID_PLACEHOLDER_SIZE`;
const PLACEHOLDER_SIZE_ERROR = `Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l`;

const SIZES = [`xs`, `s`, `m`, `l`, `xl`];

let column = 0;

let errors = [];

const createErrorObject = (errorCode, errorMessage, errorLocationStart, errorLocationEnd) => {
  const error = {
    code: `${errorCode}`,
    error: `${errorMessage}`,
    location: {
      start: {
        column: 1,
        line: 1
      },
      end: {
        column: 2,
        line: 22
      },
    },
  };
  return error;
};

const findFirstElementIndex = (arr, blockName) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName) {
      return i;
    }
  }
  return -1;
};

const checkWarningPlaceholderSize = (object, errors) => {

};

const checkWarningButtonPosition = (object, errors) => {

};

const checkWarningButtonSize = (object, errors) => {

};

const checkWarningTextSize = (contentArr, errorsArr) => {
  const gauge = contentArr[0].mods.size;



  const contents = object.content[1].content;
  for (let block = 0; block < contents.length - 1; block++) {
    if (contents[block].mods.size !== contents[block + 1].mods.size) {
      errorsArr.push(createErrorObject(WARNING_CODE + TEXT_SIZE_CODE, TEXT_SIZE_ERROR));
      return;
    }
  };
};

const warningTest = (warningBlock) => {
  const warningObject = JSON.parse(warningBlock);

  // console.log(errors);
  
  return errors;
};

export {warningTest, createErrorObject, findFirstElementIndex};
