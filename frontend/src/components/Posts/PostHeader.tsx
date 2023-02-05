import React from "react";

// type
import type { PostSortBy } from "@src/types";

type Props = {
  title: string;
  onChangeSortBy: React.ChangeEventHandler<HTMLSelectElement>;
  sortBy: PostSortBy;
};

const PostHeader = ({ title, onChangeSortBy, sortBy }: Props) => {
  return (
    <section className="flex justify-between">
      <h3 className="font-jua text-4xl pb-2">{title}</h3>

      <form>
        <label htmlFor="sort-by" hidden>
          정렬 순서
        </label>
        <select
          name="sort-by"
          id="sort-by"
          className="p-1 rounded-md font-extrabold border-[3px] border-gray-400 outline-none focus:border-main-500 focus:text-main-500"
          onChange={onChangeSortBy}
          value={sortBy}
        >
          <option value="popular">인기순</option>
          <option value="latest">최신순</option>
        </select>
      </form>
    </section>
  );
};

export default React.memo(PostHeader);
