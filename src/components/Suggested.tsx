import { Link } from "react-router-dom";
import { useAppSelector } from "@src/hooks/useRTK";

type Props = {
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
};

// 추천 검색어 ( 영화 )
const Movie = ({ setFocusIndex }: Props) => {
  const { suggestedMovies, suggestedMovieLoading } = useAppSelector(
    ({ movie }) => movie
  );

  return (
    <>
      {!suggestedMovieLoading && suggestedMovies && (
        <div className="flex flex-col mt-1 rounded-b-sm overflow-hidden bg-white">
          {suggestedMovies.results.map((movie, index) => (
            <Link
              key={movie.id}
              to={`/search?category=movie&title=${movie.title}`}
              className="px-4 py-1 transition-colors whitespace-nowrap text-ellipsis overflow-hidden break-keep hover:bg-teal-400 hover:text-white focus:outline-none focus:bg-teal-400 focus:text-white"
              onFocus={() => setFocusIndex(index)}
            >
              {movie.title}
            </Link>
          ))}

          {/* 추천 검색어가 없다면 */}
          {suggestedMovies.results.length === 0 && (
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
  const { suggestedDramas, suggestedDramaLoading } = useAppSelector(
    ({ drama }) => drama
  );

  return (
    <>
      {!suggestedDramaLoading && suggestedDramas && (
        <div className="flex flex-col mt-1 rounded-b-sm overflow-hidden bg-white">
          {suggestedDramas.results.map((drama, index) => (
            <Link
              key={drama.id}
              to={`/search?category=movie&title=${drama.name}`}
              className="px-4 py-1 transition-colors whitespace-nowrap text-ellipsis overflow-hidden break-keep hover:bg-teal-400 hover:text-white focus:outline-none focus:bg-teal-400 focus:text-white"
              onFocus={() => setFocusIndex(index)}
            >
              {drama.name}
            </Link>
          ))}

          {/* 추천 검색어가 없다면 */}
          {suggestedDramas.results.length === 0 && (
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

type SuggestedType = {
  Movie: typeof Movie;
  Drama: typeof Drama;
};
const Suggested: SuggestedType = {
  Movie,
  Drama,
};

export default Suggested;
