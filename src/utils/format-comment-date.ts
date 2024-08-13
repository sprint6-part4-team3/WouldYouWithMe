/**
 * 날짜를 문자열 형태로 변환
 * 24시간 이후: 2024.08.01
 * 24시간 이전: 16시간 전, 30분 전
 */
const formatCommentDate = (time: Date | string): string => {
  const date = new Date(time);
  const today = new Date();

  const elapsedTime = today.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedTime / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours < 24) {
    if (elapsedHours > 0) {
      return `${elapsedHours}시간 전`;
    }
    if (elapsedMinutes > 0) {
      return `${elapsedMinutes}분 전`;
    }
    return "방금전";
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export default formatCommentDate;
