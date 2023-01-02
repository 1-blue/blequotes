import { useCallback, useEffect } from "react";

type Props = {
  observerRef: HTMLDivElement | null;
  fetchMore: () => void;
  hasMore: boolean;
};

// 2022/12/25 - "IntersectionObserver"의 옵션들 - by 1-blue
const options: IntersectionObserverInit = {
  threshold: 0.1,
};

/**
 * 2022/12/24 - 무한 스크롤링 적용 훅 - by 1-blue
 * @param observerRef 감시할 element ref
 * @param fetchMore 추가 패치를 실행할 함수
 * @param hasMore 더 패치할 수 있는지 여부
 * @returns
 */
const useInfiniteScrolling = ({ observerRef, fetchMore, hasMore }: Props) => {
  // 2022/12/24 - 뷰포트 내에 감시하는 태그가 들어왔다면 패치 - by 1-blue
  const onScroll: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;

      fetchMore();
    },
    [fetchMore]
  );
  // 2022/12/24 - observer 등록 ( 해당 태그가 뷰포트에 들어오면 게시글 추가 패치 실행 ) - by 1-blue
  useEffect(() => {
    if (!observerRef) return;

    // 콜백함수와 옵션값 지정
    let observer = new IntersectionObserver(onScroll, options);
    // 특정 요소 감시 시작
    observer.observe(observerRef);

    // 더 가져올 게시글이 존재하지 않는다면 패치 중지
    if (!hasMore) observer.unobserve(observerRef);

    // 감시 종료
    return () => observer.disconnect();
  }, [observerRef, onScroll, hasMore]);

  return;
};

export default useInfiniteScrolling;
