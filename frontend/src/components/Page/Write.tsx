import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  bookThunkService,
  dramaThunkService,
  movieThunkService,
  postThunkService,
} from "@src/store/thunks";
import { postActions } from "@src/store/reducers/postReducer";

// util
import { dateFormat, getMovieDBImagePath } from "@src/utils";

// api
import { imageApiService } from "@src/store/apis";

// hook
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import useInnerSize from "@src/hooks/useInnerSize";
import useToastify from "@src/hooks/useToastify";

// component
import RHF from "@src/components/Common/RHF";
import Image from "@src/components/Common/Image";
import Icon from "@src/components/Common/Icon";
import Loading from "@src/components/Common/Loading";
import NotFoundPost from "@src/components/NotFoundPost";
import SkeletonUI from "@src/components/Common/SkeletonUI";

// type
import type { LinkState, TargetData } from "@src/types";
import type { CreatePostRequest } from "@src/store/types";

type PostForm = Omit<CreatePostRequest, "thumbnail" | "time"> & {
  thumbnail?: FileList;
  hour?: number;
  minute?: number;
  second?: number;
};

const Write = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { title } = useParams() as { title: string };
  const { state } = useLocation() as LinkState;

  const { detailMovie, detailMovieLoading } = useAppSelector(
    ({ movie }) => movie
  );
  const { detailDrama, detailDramaLoading } = useAppSelector(
    ({ drama }) => drama
  );
  const { detailBook, detailBookLoading } = useAppSelector(({ book }) => book);
  // 2022/12/31 - 현재 대상에 대한 상세 정보 요청 - by 1-blue
  useEffect(() => {
    if (!state?.idx) return;

    switch (state.category) {
      case "MOVIE":
        dispatch(movieThunkService.detailMovieThunk({ movieIdx: state.idx }));
        break;
      case "DRAMA":
        dispatch(dramaThunkService.detailDramaThunk({ dramaIdx: state.idx }));
        break;
      case "BOOK":
        dispatch(bookThunkService.detailBookThunk({ bookIdx: state.idx }));
        break;
    }
  }, [state, dispatch]);
  // 2022/12/31 - 영화/드라마/도서의 상세 정보 중 필요한 정보만 추출한 변수 - by 1-blue
  const [data, setData] = useState<TargetData | null>(null);
  useEffect(() => {
    if (!state?.category) return;

    if (state.category === "MOVIE" && detailMovie) {
      setData({
        idx: detailMovie.id + "",
        title: detailMovie.title,
        description: detailMovie.overview,
        date: detailMovie.release_date,
        paths: [detailMovie.poster_path, detailMovie.backdrop_path]
          .filter((v) => v)
          .map((v) => getMovieDBImagePath(v)),
        category: state.category,
      });
    }
    if (state.category === "DRAMA" && detailDrama) {
      setData({
        idx: detailDrama.id + "",
        title: detailDrama.name,
        description: detailDrama.overview,
        date: detailDrama.first_air_date,
        paths: [detailDrama.poster_path, detailDrama.backdrop_path]
          .filter((v) => v)
          .map((v) => getMovieDBImagePath(v)),
        category: state.category,
      });
    }
    // 도서
    if (state.category === "BOOK" && detailBook) {
      setData({
        idx: detailBook.isbn,
        title: detailBook.title,
        description: detailBook.contents,
        date: dateFormat(new Date(detailBook.datetime), "YYYY-MM-DD"),
        paths: [detailBook.thumbnail],
        category: state.category,
      });
    }
  }, [state, detailMovie, detailDrama, detailBook]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();

  // 2022/12/31 - 기본 값들 입력 ( idx, category, title ) - by 1-blue
  useEffect(() => {
    if (!state) return;
    if (!state.idx || !state.category) return;

    setValue("idx", state.idx);
    setValue("category", state.category);

    switch (state.category) {
      case "MOVIE":
        if (!detailMovie) return;
        setValue("title", detailMovie.title);
        break;

      case "DRAMA":
        if (!detailDrama) return;
        setValue("title", detailDrama.name);
        break;

      case "BOOK":
        if (!detailBook) return;
        setValue("title", detailBook.title);
        break;
    }
  }, [state, detailMovie, detailDrama, detailBook, setValue]);

  // 2022/12/20 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/21 - 썸네일 관련 처리 - by 1-blue
  const { ref: refThumbnailRegister, ...restThumbnailRegister } =
    register("thumbnail");
  const thumbnailRef = useRef<null | HTMLInputElement>(null);
  const thumbnailFiles = watch("thumbnail");
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  useEffect(() => {
    // 썸네일이 입력되면 브라우저에서만 보여줄 수 있도록 blob url 얻기
    if (thumbnailFiles && thumbnailFiles.length > 0) {
      setPreviewThumbnail(URL.createObjectURL(thumbnailFiles[0]));
    }
  }, [thumbnailFiles]);

  // 2022/12/22 - 게시글을 생성중인지 판단할 변수 - by 1-blue
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // 2022/12/22 - 게시글 생성 성공/실패 판단 변수 - by 1-blue
  const { createPostDone, createPostError } = useAppSelector(
    (state) => state.post
  );

  // 2022/12/22 - 게시글 생성 요청 - by 1-blue
  const createPost = useCallback(
    async (e: PostForm) => {
      if (!data) return;

      // 게시글 생성 시작
      setIsCreatingPost(true);

      try {
        // 기본 썸네일은 해당 포스터 이미지
        let thumbnailPath = data.paths[0];

        // 썸네일이 있다면 업로드
        if (e.thumbnail && e.thumbnail?.length > 0) {
          // presignedURL 요청
          const {
            data: {
              data: { preSignedURL },
            },
          } = await imageApiService.apiFetchPresinedURL({
            name: e.thumbnail[0].name,
          });

          // 업로드된 이미지의 URL ( "?"를 기준으로 나누면 배포된 URL을 얻을 수 있음 )
          thumbnailPath = preSignedURL.slice(0, preSignedURL.indexOf("?"));

          // 이미지 업로드 요청
          await imageApiService.apiCreateImage({
            preSignedURL,
            file: e.thumbnail[0],
          });
        }

        const { thumbnail, hour, minute, second, ...rest } = e;
        let time: undefined | string = undefined;
        const episode = rest.episode ? +rest.episode : undefined;
        const page = rest.page ? +rest.page : undefined;

        if (hour || minute || second) {
          time = `${hour ? hour : 0}시간 ${minute ? minute : 0}분 ${
            second ? second : 0
          }초`;
        }

        dispatch(
          postThunkService.createPostThunk({
            ...rest,
            time,
            episode,
            page,
            thumbnail: thumbnailPath,
          })
        );
      } catch (error) {
        console.error("게시글 생성 or 이미지 업로드 실패 >> ", error);
      } finally {
        // 게시글 생성 끝
        setIsCreatingPost(false);
      }
    },
    [data, dispatch]
  );

  // 2022/12/22 - 게시글 생성 토스트 처리 - by 1-blue
  useToastify({
    doneMessage: createPostDone,
    errorMessage: createPostError,
    callback() {
      navigate(`/post/${detailMovie?.title}`, {
        state: { idx: state?.idx, category: state?.category },
      });
      dispatch(postActions.resetMessage());
    },
  });

  // 링크 클릭을 하지 않고 "URL"로 바로 접근한 경우
  if (!state) return <NotFoundPost title={title} />;

  // 현재 대상의 데이터 패치중
  if (detailMovieLoading || detailDramaLoading || detailBookLoading || !data)
    return (
      <>
        <SkeletonUI.DetailTarget />;
        <div className="my-6" />
        <ul className="mx-4 grid gap-4 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          <SkeletonUI.Posts />
        </ul>
      </>
    );

  return (
    <>
      <section className="bg-black text-white">
        {/* 상단 설명부 */}
        <div className="w-[60vw] min-w-[300px] mx-auto space-y-3">
          <div className="h-[100px]"></div>
          <p className="font-semibold bg-main-400 text-white px-4 py-2 mx-auto rounded-md before:content-['💡']">
            작성된 게시글은 관리자에 의해서 임의로 삭제할 수 있으며, 작성자에게
            게시글에 대한 권한이 부여되지 않습니다.
          </p>
          <h1 className="text-4xl font-bold text-center mx-auto">
            {data.title}
          </h1>
          <time className="inline-block w-full text-center text-sm">
            {data.date}
          </time>
          <p className="font-semibold mx-auto pb-4">{data.description}</p>
        </div>
      </section>

      {/* 중단 이미지 */}
      <section className="w-full bg-black">
        <Image.BackgroundImage
          path={
            data.paths[1] && innerWidth >= 1030 ? data.paths[1] : data.paths[0]
          }
          alt={`"${data.title}"의 이미지`}
          className="bg-center bg-contain bg-no-repeat h-[80vh] bg-local mb-4 max-w-[1200px] mx-auto"
        />
      </section>

      {/* 하단 입력부 */}
      <RHF.Form
        onSubmit={handleSubmit(createPost)}
        className="flex flex-col w-[90vw] min-w-[250px] mx-auto space-y-2 md:w-[60vw]"
      >
        <RHF.TextArea
          register={register}
          name="speech"
          rows={3}
          placeholder={`👉 "${data.title}"의 명대사를 입력해주세요! 👈`}
          className="border-gray-300 border-2 rounded-md px-2 py-1 text-lg resize-none font-semibold overflow-hidden transition-colors focus:outline-main-400 placeholder:text-base placeholder:text-center"
          error={errors.speech}
          options={{
            required: {
              value: true,
              message: "반드시 입력해야합니다!",
            },
            maxLength: {
              value: 300,
              message: "최대 300자까지 입력이 가능합니다!",
            },
          }}
        />

        {/* 썸네일과 시간 / 생성 버튼 부분 */}
        <div className="flex space-y-2 pb-4 flex-col md:flex-row md:space-x-2">
          {/* 썸네일 */}
          <div className="flex-1 space-y-2">
            <input
              type="file"
              {...restThumbnailRegister}
              ref={(e) => {
                refThumbnailRegister(e);
                thumbnailRef.current = e;
              }}
              hidden
            />
            <button
              type="button"
              className="group w-full relative border-2 border-gray-300 pt-[100%] rounded-md transition-colors hover:border-main-400"
              onClick={() => thumbnailRef.current?.click()}
            >
              <div className="group-hover:bg-black/40 group-hover:z-[1] absolute top-[1%] left-[1%] w-[98%] h-[98%] bg-black/10 transition-colors" />
              <Icon
                shape={previewThumbnail ? "change" : "plus"}
                className="group-hover:text-main-400 group-hover:z-[1] absolute inset-[50%] translate-center h-10 w-10 text-gray-500"
              />
              {previewThumbnail && (
                <Image.Photo
                  path={previewThumbnail}
                  alt="사용자가 업로드한 이미지"
                  className="absolute top-[1%] left-[1%] w-[98%] h-[98%] bg-center bg-cover rounded-sm"
                />
              )}
            </button>
            <p className="font-semibold text-sm bg-main-400 text-white px-4 py-2 w-full rounded-md before:content-['💡']">
              썸네일을 등록하지 않으면 포스터 이미지로 대체됩니다.
            </p>
          </div>
          {/* 시간 / 게시글 생성 버튼 */}
          <div className="flex-1 flex flex-col space-y-2 min-w-[142px]">
            {/* 시간 */}
            <p className="font-semibold text-sm bg-main-400 text-white px-4 py-2 w-full rounded-md before:content-['💡']">
              명대사에 관한 정보를 입력해주세요!
              <br />
              반드시 입력할 필요는 없습니다!
            </p>
            {/* 영화인 경우 */}
            {state.category === "MOVIE" && (
              <>
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 2, message: "2시간 이하로 입력해주세요!" },
                  }}
                  error={errors.hour}
                  name="hour"
                  type="number"
                  placeholder="시간을 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 59, message: "59분 이하로 입력해주세요!" },
                  }}
                  error={errors.minute}
                  name="minute"
                  type="number"
                  placeholder="분을 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 2, message: "59초 이하로 입력해주세요!" },
                  }}
                  error={errors.second}
                  name="second"
                  type="number"
                  placeholder="초를 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
              </>
            )}
            {/* 드라마인 경우 */}
            {state.category === "DRAMA" && (
              <>
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 200, message: "200 이하로 입력해주세요!" },
                  }}
                  error={errors.episode}
                  name="episode"
                  type="number"
                  placeholder="몇 화인지 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 2, message: "2시간 이하로 입력해주세요!" },
                  }}
                  error={errors.hour}
                  name="hour"
                  type="number"
                  placeholder="시간을 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 59, message: "59분 이하로 입력해주세요!" },
                  }}
                  error={errors.minute}
                  name="minute"
                  type="number"
                  placeholder="분을 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  options={{
                    max: { value: 59, message: "59초 이하로 입력해주세요!" },
                  }}
                  error={errors.second}
                  name="second"
                  type="number"
                  placeholder="초를 숫자만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-500 placeholder:text-sm"
                />
              </>
            )}
            {/* 도서인 경우 */}
            {state.category === "BOOK" && (
              <>
                <RHF.Input
                  register={register}
                  options={{
                    max: {
                      value: 4000,
                      message: "4000페이지 이하로 입력해주세요!",
                    },
                  }}
                  error={errors.page}
                  name="page"
                  type="number"
                  placeholder="페이지를 숫자로만 입력해주세요!"
                  className="border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-main-400 placeholder:text-sm"
                />
              </>
            )}

            <div className="flex-1" />

            {/* 게시글 생성 버튼  */}
            <RHF.Button
              type="submit"
              className="self-end bg-main-400 text-white px-4 py-2 rounded-md font-bold text-sm transition-colors hover:bg-main-300 active:bg-main-500"
            >
              생성하기
            </RHF.Button>

            <div />
          </div>
        </div>
      </RHF.Form>

      {/* 게시글 업로드 중 스피너 */}
      {isCreatingPost && (
        <Loading.FullScreen message="게시글을 생성하는 중입니다." />
      )}
    </>
  );
};

export default Write;
