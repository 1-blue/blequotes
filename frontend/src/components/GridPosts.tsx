import React from "react";
import { useAppSelector } from "@src/hooks/useRTK";

// components
import Icon from "@src/components/Common/Icon";
import SkeletonUI from "@src/components/Common/SkeletonUI";

// type
import type { Post } from "@src/store/types";

type Props = {
  posts: Post[];
};

const GridPosts = React.forwardRef<HTMLDivElement, Props>(({ posts }, ref) => {
  const { getPostsLoading } = useAppSelector(({ post }) => post);

  return (
    <>
      <ul className="grid gap-4 mx-[20px] grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ backgroundImage: `url("${post.thumbnail}")` }}
            className="group relative pt-[80%] bg-center bg-cover bg-no-repeat bg-gray-200 rounded-md shadow-xl overflow-hidden text-white transition-all hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 transition-colors group-hover:bg-black/50" />

            <div className="absolute top-[10%] left-[10%] space-y-2 z-[1]">
              <h4 className="text-center text-2xl">
                <b>{post.title}</b>
              </h4>
              <p className="text-sm whitespace-pre-wrap">
                <b>"{post.speech}"</b>
              </p>
            </div>

            <form className="absolute bottom-[4%] right-[4%] self-end z-[1] space-y-1">
              <button type="button" className="flex items-center space-x-1">
                <Icon shape="like" className="w-5 h-5" />
                <span className="text-sm">
                  <b>{post.like}</b>
                </span>
              </button>
              <button type="button" className="flex items-center space-x-1">
                <Icon shape="hate" className="w-5 h-5" />
                <span className="text-sm">
                  <b>{post.hate}</b>
                </span>
              </button>
            </form>
          </li>
        ))}

        {getPostsLoading && <SkeletonUI.Posts />}
      </ul>

      <div className="py-6" ref={ref} />
    </>
  );
});

export default React.memo(GridPosts);
