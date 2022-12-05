/**
 * 2022/12/05 - 영화 이미지 경로 얻기 - by 1-blue
 * @param name 영화 이미지 이름
 * @returns 영화 이미지 경로
 */
export const getMovieImagePath = (name: string) =>
  process.env.REACT_APP_MOVIE_IMAGE_URL + name;

/**
 * 2022/12/05 - 클래스명 합치기 - by 1-blue
 * @param classname 클래스명 문자열 배열
 * @returns 합쳐진 클래스명
 */
export const combineClassNames = (...classname: string[]) =>
  classname.join(" ");

/**
 * 스로틀링 적용 헬퍼 함수
 * @param callback 이후에 실행할 콜백함수
 * @param waitTime 기다릴 시간
 * @returns "waitTime"만큼 스로틀링이 적용된 함수("callback") 반환
 */
export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};
