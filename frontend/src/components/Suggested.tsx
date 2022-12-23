import { Link } from "react-router-dom";
import { useAppSelector } from "@src/hooks/useRTK";

type Props = {
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
};

// 추천 검색어 ( 영화 )
const Movie = ({ setFocusIndex }: Props) => {
  const { suggestedMovies, suggestedMoviesLoading } = useAppSelector(
    ({ movie }) => movie
  );

  return (
    <>
      {!suggestedMoviesLoading && (
        <div className="flex flex-col mt-1 rounded-b-sm overflow-hidden bg-white">
          {suggestedMovies.map((title, index) => (
            <Link
              key={title}
              to={`/search?category=movie&title=${title}`}
              className="px-4 py-1 transition-colors whitespace-nowrap text-ellipsis overflow-hidden break-keep hover:bg-main-400 hover:text-white focus:outline-none focus:bg-main-400 focus:text-white"
              onFocus={() => setFocusIndex(index)}
            >
              {title}
            </Link>
          ))}

          {/* 추천 검색어가 없다면 */}
          {suggestedMovies.length === 0 && (
            <div className="p-4">
              <span>
                <b>검색되는 영화가 없습니다.</b>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// 추천 검색어 ( 드라마 )
const Drama = ({ setFocusIndex }: Props) => {
  const { suggestedDramas, suggestedDramasLoading } = useAppSelector(
    ({ drama }) => drama
  );

  return (
    <>
      {!suggestedDramasLoading && (
        <div className="flex flex-col mt-1 rounded-b-sm overflow-hidden bg-white">
          {suggestedDramas.map((title, index) => (
            <Link
              key={title}
              to={`/search?category=drama&title=${title}`}
              className="px-4 py-1 transition-colors whitespace-nowrap text-ellipsis overflow-hidden break-keep hover:bg-main-400 hover:text-white focus:outline-none focus:bg-main-400 focus:text-white"
              onFocus={() => setFocusIndex(index)}
            >
              {title}
            </Link>
          ))}

          {/* 추천 검색어가 없다면 */}
          {suggestedDramas.length === 0 && (
            <div className="p-4">
              <span>
                <b>검색되는 드라마가 없습니다.</b>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// 추천 검색어 ( 도서 )
const Book = ({ setFocusIndex }: Props) => {
  const { suggestedBooks, suggestedBooksLoading } = useAppSelector(
    ({ book }) => book
  );

  return (
    <>
      {!suggestedBooksLoading && (
        <div className="flex flex-col mt-1 rounded-b-sm overflow-hidden bg-white">
          {suggestedBooks.map((title, index) => (
            <Link
              key={title}
              to={`/search?category=book&title=${title}`}
              className="px-4 py-1 transition-colors whitespace-nowrap text-ellipsis overflow-hidden break-keep hover:bg-main-400 hover:text-white focus:outline-none focus:bg-main-400 focus:text-white"
              onFocus={() => setFocusIndex(index)}
            >
              {title}
            </Link>
          ))}

          {/* 추천 검색어가 없다면 */}
          {suggestedBooks.length === 0 && (
            <div className="p-4">
              <span>
                <b>검색되는 도서가 없습니다.</b>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

type SuggestedType = {
  Movie: typeof Movie;
  Drama: typeof Drama;
  Book: typeof Book;
};
const Suggested: SuggestedType = {
  Movie,
  Drama,
  Book,
};

export default Suggested;
