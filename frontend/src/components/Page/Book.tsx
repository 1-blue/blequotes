import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { postThunkService } from "@src/store/thunks";
import { postActions } from "@src/store/reducers/postReducer";

// hook
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// components
import HeadInfo from "@src/components/Common/HeadInfo";
import GridPosts from "@src/components/Posts/GridPosts";
import PostHeader from "@src/components/Posts/PostHeader";

// type
import type { PostSortBy } from "@src/types";

const Book = () => {
  const dispatch = useAppDispatch();
  const { bookPosts, hasMoreBookPosts, getPostsLoading } = useAppSelector(
    ({ post }) => post
  );

  // 2022/12/30 - 게시글들 정렬 순서 - by 1-blue
  const [sortBy, setSortBy] = useState<PostSortBy>("popular");

  // 2022/12/30 - 도서 게시글들 패치 - by 1-blue
  useEffect(() => {
    dispatch(postActions.reset());

    dispatch(
      postThunkService.getPostsThunk({
        category: "BOOK",
        sortBy,
        take: 20,
        lastId: -1,
      })
    );
  }, [dispatch, sortBy]);

  // 2022/12/30 - 무한 스크롤링을 위해 관찰할 태그 ref ( 해당 태그가 뷰포트에 들어오면 게시글 추가 패치 실행 ) - by 1-blue
  // ( ref지만 값에 의해 렌더링에 영향을 끼지기 때문에 "useState()""사용 )
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);
  // 2022/12/30 - 도서 더 가져오기 - by 1-blue
  const fetchMoreBookPosts = useCallback(() => {
    if (getPostsLoading) return;
    if (!hasMoreBookPosts) return;

    dispatch(
      postThunkService.getPostsThunk({
        category: "BOOK",
        sortBy,
        take: 20,
        lastId: bookPosts[bookPosts.length - 1].id,
      })
    );
  }, [getPostsLoading, hasMoreBookPosts, dispatch, sortBy, bookPosts]);
  // 2022/12/30 - 도서 가져오기 무한 스크롤링 적용 - by 1-blue
  useInfiniteScrolling({
    observerRef,
    fetchMore: fetchMoreBookPosts,
    hasMore: hasMoreBookPosts,
  });

  // 2022/12/30 - 게시글들 정렬 순서 변경 - by 1-blue
  const onChangeSortBy = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as PostSortBy);
    },
    []
  );

  return (
    <>
      {/* meta */}
      <HeadInfo
        title="도서 | 명대사"
        description="작성된 도서 명대사를 보는 페이지입니다."
      />

      {/* 네비게이션 바의 높이가 92px이라서 상단을 띄워주기 위해 사용 */}
      <section className="h-[92px] bg-gray-600 mb-6"></section>

      {/* 게시글들 */}
      <section className="mx-4">
        <PostHeader
          title="도서 명대사들"
          onChangeSortBy={onChangeSortBy}
          sortBy={sortBy}
        />

        <GridPosts posts={bookPosts} ref={setObserverRef} />
      </section>
    </>
  );
};

export default Book;
