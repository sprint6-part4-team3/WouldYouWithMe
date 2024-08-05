/**
 * 문자열 배열을 숫자 배열로 변환합니다.
 * @param array - 변환할 문자열 배열입니다.
 * @returns 숫자 배열입니다.
 * @author ☯채종민
 */
const convertStringArrayToNumberArray = (array: string[]): number[] =>
  array.map((item) => Number(item));

export default convertStringArrayToNumberArray;
