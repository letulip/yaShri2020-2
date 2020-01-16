import {
  SIZES,
  SIZES_PLACEHOLDER,
  createErrorObject,
  findFirstElementIndex
} from './common';

const WARNING_CODE = `WARNING.`;
const TEXT_BLOCK = `text`;
const BUTTON_BLOCK = `button`;
const PLACEHOLDER_BLOCK = `placeholder`;

const TEXT_SIZE_CODE = `TEXT_SIZES_SHOULD_BE_EQUAL`;
const TEXT_SIZE_ERROR = `Тексты в блоке warning должны быть одного размера`;
const BUTTON_SIZE_CODE = `INVALID_BUTTON_SIZE`;
const BUTTON_SIZE_ERROR = `Размер кнопки блока warning должен быть на 1 шаг больше эталонного`;
const BUTTON_POSITION_CODE = `INVALID_BUTTON_POSITION`;
const BUTTON_POSITION_ERROR = `Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности`;
const PLACEHOLDER_SIZE_CODE = `INVALID_PLACEHOLDER_SIZE`;
const PLACEHOLDER_SIZE_ERROR = `Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l`;

const checkWarningPlaceholderSize = (contentArr) => {
  const placeholderIndex = findFirstElementIndex(contentArr, PLACEHOLDER_BLOCK);

  if (!SIZES_PLACEHOLDER.includes(contentArr[placeholderIndex].mods.size)) {
    return createErrorObject(WARNING_CODE + PLACEHOLDER_SIZE_CODE, PLACEHOLDER_SIZE_ERROR);
  }
};

const checkWarningButtonPosition = (contentArr) => {
  const firstPlaceholderElementIndex = findFirstElementIndex(contentArr, PLACEHOLDER_BLOCK);
  const firstButtonElementIndex = findFirstElementIndex(contentArr, BUTTON_BLOCK);

  if (firstButtonElementIndex < firstPlaceholderElementIndex) {
    return createErrorObject(WARNING_CODE + BUTTON_POSITION_CODE, BUTTON_POSITION_ERROR);
  }
};

const checkWarningButtonSize = (contentArr) => {
  const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
  const firstButtonElementIndex = findFirstElementIndex(contentArr, BUTTON_BLOCK);
  const gauge = SIZES[SIZES.indexOf(contentArr[firstTextElementIndex].mods.size) + 1];

  if (contentArr[firstButtonElementIndex].mods.size !== gauge) {
    return createErrorObject(WARNING_CODE + BUTTON_SIZE_CODE, BUTTON_SIZE_ERROR);
  }
};

const checkWarningTextSize = (contentArr) => {
  const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
  const gauge = contentArr[firstTextElementIndex].mods.size;

  for (let i = firstTextElementIndex + 1; i < contentArr.length; i++) {
    if (contentArr[i].mods.size !== gauge) {
      return createErrorObject(WARNING_CODE + TEXT_SIZE_CODE, TEXT_SIZE_ERROR);
    }
  }
};

export {
  checkWarningTextSize,
  checkWarningButtonSize,
  checkWarningButtonPosition,
  checkWarningPlaceholderSize
};