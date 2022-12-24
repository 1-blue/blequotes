// component
import Icon from "@src/components/Common/Icon";

const Posts = () => {
  return (
    <>
      {Array(20)
        .fill(null)
        .map((v, i) => (
          <li
            key={i}
            className="group relative pt-[80%] bg-gray-100 rounded-md shadow-xl text-white overflow-hidden transition-all hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 transition-colors group-hover:bg-black/50" />

            <div className="absolute top-[10%] left-[10%] w-[80%] space-y-2 z-[1]">
              <div className="w-full h-8 mb-4 bg-gray-200 rounded" />

              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
            </div>

            <form className="absolute bottom-[4%] right-[4%] self-end z-[1] space-y-1">
              <button type="button" className="flex items-center space-x-1">
                <Icon shape="like" className="w-5 h-5" />
                <span className="text-sm">
                  <b>0</b>
                </span>
              </button>
              <button type="button" className="flex items-center space-x-1">
                <Icon shape="hate" className="w-5 h-5" />
                <span className="text-sm">
                  <b>0</b>
                </span>
              </button>
            </form>
          </li>
        ))}
    </>
  );
};

type SkeletonType = {
  Posts: typeof Posts;
};
const Skeleton: SkeletonType = {
  Posts,
};

export default Skeleton;
