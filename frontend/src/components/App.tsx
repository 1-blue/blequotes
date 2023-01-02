import { useCallback, useEffect, useState } from "react";
import { postActions } from "@src/store/reducers/postReducer";
import { postThunkService } from "@src/store/thunks";

// hook
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// component
import PostHeader from "@src/components/Posts/PostHeader";
import GridPosts from "@src/components/Posts/GridPosts";

// type
import type { PostSortBy } from "@src/types";

const App = () => {
  const dispatch = useAppDispatch();
  const { posts, getPostsLoading, hasMorePosts } = useAppSelector(
    ({ post }) => post
  );

  // 2023/01/02 - 게시글들 정렬 순서 - by 1-blue
  const [sortBy, setSortBy] = useState<PostSortBy>("popular");
  // 2023/01/02 - 게시글들 정렬 순서 변경 - by 1-blue
  const onChangeSortBy = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as PostSortBy);
    },
    []
  );
  // 2023/01/02 - 모든 게시글들 패치 요청 - by 1-blue
  useEffect(() => {
    dispatch(postActions.reset());

    dispatch(
      postThunkService.getPostsThunk({
        category: "ALL",
        sortBy,
        take: 20,
        lastId: -1,
      })
    );
  }, [dispatch, sortBy]);
  // 2023/01/02 - 무한 스크롤링을 위해 관찰할 태그 ref ( 해당 태그가 뷰포트에 들어오면 게시글 추가 패치 실행 ) - by 1-blue
  // ( ref지만 값에 의해 렌더링에 영향을 끼지기 때문에 "useState()""사용 )
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);
  // 2023/01/02 - 게시글 더 가져오기 - by 1-blue
  const fetchMoreMovies = useCallback(() => {
    if (getPostsLoading) return;
    if (!hasMorePosts) return;

    dispatch(
      postThunkService.getPostsThunk({
        category: "ALL",
        sortBy,
        take: 20,
        lastId: posts[posts.length - 1].id,
      })
    );
  }, [getPostsLoading, hasMorePosts, dispatch, sortBy, posts]);
  // 2023/01/02 - 게시글 가져오기 무한 스크롤링 적용 - by 1-blue
  useInfiniteScrolling({
    observerRef,
    fetchMore: fetchMoreMovies,
    hasMore: hasMorePosts,
  });

  return (
    <>
      {/* 네비게이션 바의 높이가 92px이라서 상단을 띄워주기 위해 사용 */}
      <section className="h-[92px] bg-gray-600 mb-6"></section>

      {/* 게시글들 */}
      <section className="mx-4">
        <PostHeader
          title="명대사들"
          onChangeSortBy={onChangeSortBy}
          sortBy={sortBy}
        />

        <GridPosts posts={posts} ref={setObserverRef} />
      </section>
    </>
  );
};

export default App;
