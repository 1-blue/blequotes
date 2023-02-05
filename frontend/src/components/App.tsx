import { useCallback, useEffect, useState, useMemo } from "react";
import { postActions } from "@src/store/reducers/postReducer";
import { postThunkService } from "@src/store/thunks";

// hook
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";
import useInnerSize from "@src/hooks/useInnerSize";

// component
import HeadInfo from "@src/components/Common/HeadInfo";
import PostHeader from "@src/components/Posts/PostHeader";
import GridPosts from "@src/components/Posts/GridPosts";
import Image from "@src/components/Common/Image";

// main poster data
import { heightThumbnails, widthThumbnails } from "@src/data";

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
  const onChangeSortBy: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setSortBy(e.target.value as PostSortBy);
    }, []);
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
  const fetchMorePosts = useCallback(() => {
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
    fetchMore: fetchMorePosts,
    hasMore: hasMorePosts,
  });

  // 2022/01/16 - 현재 브라우저 가로 사이즈 - by 1-blue
  const [innerWidth] = useInnerSize();
  // 2022/01/16 - 랜덤한 이미지 인덱스 제작 - by 1-blue
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * widthThumbnails.length),
    []
  );
  // 2022/01/16 - 메인 이미지로 사용할 이미지 선택 - by 1-blue
  const mainImage =
    innerWidth > 768
      ? widthThumbnails[randomIndex]
      : heightThumbnails[randomIndex];

  return (
    <>
      {/* meta */}
      <HeadInfo
        title="홈 | 명대사"
        description="작성된 모든 명대사를 보는 페이지입니다."
        image={widthThumbnails[randomIndex]}
      />

      {/* 네비게이션 바의 높이가 92px이라서 상단을 띄워주기 위해 사용 */}
      <section className="h-[92px] bg-gray-600" />

      {/* Banner */}
      <section className="relative">
        <Image.Photo
          className="h-[60vh] bg-no-repeat bg-center bg-contain mb-6"
          path={mainImage}
          alt="대표 배경 이미지"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
          <h3 className="mx-8 text-white text-xl font-bold text-center xs:text-2xl">
            영화 / 드라마 / 도서의 명대사를 등록하는 사이트입니다.
            <br />
            여러분이 생각하는 명대사를 작성해보세요!
          </h3>
        </div>
      </section>

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
