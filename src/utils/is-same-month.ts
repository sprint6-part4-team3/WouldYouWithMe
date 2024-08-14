import {
  endOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
} from "date-fns";

/**
 * 두 날짜가 같은 달에 속한 날짜인지 검사하는 함수
 * @param date1 Date
 * @param date2 Date
 * @author ☯️채종민
 */
const isSameMonth = (date1: Date, date2: Date) =>
  isSameDay(startOfMonth(date1), startOfMonth(date2)) ||
  (isAfter(date1, startOfMonth(date2)) && isBefore(date1, endOfMonth(date2)));

export default isSameMonth;
