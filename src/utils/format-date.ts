/**
 *
 * Date 객체를 받아서 월 일 요일 string으로 바꿔는 함수
 * 7월 31일 (수) 형식입니다.
 * 오늘이면 '오늘'을 반환합니다.
 * 년도가 현재와 다르면 년도도 표시해서 줍니다.
 * @example
 * const formattedDate = formatDate(currentDate);
 * @param date Date 객체
 * @author ☯️채종민
 */
const formatDate = (date: Date) => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const isCurrentYear = date.getFullYear() === today.getFullYear();

  if (isToday) {
    return "오늘";
  }

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  if (isCurrentYear) {
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }
  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};
export default formatDate;
