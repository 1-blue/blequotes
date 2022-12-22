import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postThunkService } from "@src/store/thunks";
import { postActions } from "@src/store/reducers/postReducer";

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
import NotFountPost from "@src/components/NotFoundPost";

// type
import type { PostCategory, SStorageData } from "@src/types";

type ParamsType = { title?: string };
type LocationStateType = { state: { id?: string; category?: PostCategory } };
type PostForm = {
  idx: string;
  category: PostCategory;
  speech: string;
  thumbnail?: FileList;

  // 영화 / 드라마 용
  hour?: number;
  minute?: number;
  second?: number;

  // 드라마 용
  episode?: number;

  // 도서 용
  page?: number;
};

const Write = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { title } = useParams<ParamsType>();
  const {
    state: { id, category },
  } = useLocation() as LocationStateType;

  // 2022/12/19 - 세션 스토리지에 저장된 데이터 - by 1-blue
  const [data, setData] = useState<null | SStorageData>(null);
  useEffect(() => {
    const storageData = sessionStorage.getItem("data");
    if (!storageData) return;

    const parsingData = JSON.parse(storageData) as SStorageData;
    setData(parsingData);
  }, []);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();

  // 2022/12/20 - 기본 값들 입력 ( idx, category ) - by 1-blue
  useEffect(() => {
    if (!id || !category) return;

    setValue("idx", id);
    setValue("category", category);
  }, [id, category, setValue]);

  // 2022/12/20 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/20 - 렌더링할 이미지 path - by 1-blue
  const targetPath = useMemo(() => {
    if (!data) return "";
    if (data.paths.length === 1) return data.paths[0];

    if (innerWidth >= 1024) return data.paths[1];
    else return data.paths[0];
  }, [data, innerWidth]);

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

  //
  const { createPostDone, createPostError } = useAppSelector(
    (state) => state.post
  );

  // 2022/12/22 - 게시글 생성 요청 - by 1-blue
  const createPost = useCallback(
    async (e: PostForm) => {
      // 게시글 생성 시작
      setIsCreatingPost(true);

      try {
        let thumbnailPath: undefined | string = undefined;

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

          // 업로드된 이미지의 URL ( 이미지명에 "?"가 들어가 있지 않은 경우 "?"를 기준으로 나누면 됨 )
          // >>> 이미지명에 "?"가 들어가 있는 경우 애초에 "?"를 제거하고 요청을 보내도록 수정하기
          thumbnailPath = preSignedURL.slice(0, preSignedURL.indexOf("?"));

          // 이미지 업로드 요청
          await imageApiService.apiCreateImage({
            preSignedURL,
            file: e.thumbnail[0],
          });
        }

        const { thumbnail, hour, minute, second, ...rest } = e;
        let time: undefined | string = undefined;
        const episode = rest.episode && +rest.episode;
        const page = rest.page && +rest.page;

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
    [dispatch]
  );

  // 2022/12/22 - 게시글 생성 토스트 처리 - by 1-blue
  useToastify({
    doneMessage: createPostDone,
    errorMessage: createPostError,
    callback() {
      navigate(`/post/${title}`, { state: { id, category } });
      dispatch(postActions.resetMessage());
    },
  });

  // >>> 혹시 모르는 안전장치들
  if (
    !title ||
    !id ||
    !category ||
    !data ||
    data.title !== title ||
    data.id !== id ||
    data.category !== category
  )
    return <NotFountPost title={title} />;

  return (
    <>
      <section className="bg-black text-white">
        {/* 상단 설명부 */}
        <div className="w-[60vw] min-w-[300px] mx-auto space-y-3">
          <div className="h-[100px]"></div>
          <p className="font-semibold bg-teal-400 text-white px-4 py-2 mx-auto rounded-md before:content-['💡']">
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
          path={targetPath}
          alt={`"${data.title}"의 이미지`}
          className="bg-center bg-contain bg-no-repeat h-[80vh] bg-local mb-4 max-w-[1200px] mx-auto"
        />
      </section>

      {/* 하단 입력부 */}
      <RHF.Form
        onSubmit={handleSubmit(createPost)}
        className="flex flex-col w-[60vw] min-w-[300px] mx-auto space-y-2"
      >
        <RHF.TextArea
          register={register}
          name="speech"
          rows={3}
          placeholder={`👉 "${data.title}"의 명대사를 입력해주세요! 👈`}
          className="border-teal-400 border-2 rounded-md px-2 py-1 text-lg resize-none font-semibold overflow-hidden transition-colors focus:outline-teal-500 placeholder:text-base placeholder:text-center"
          error={errors.speech}
          options={{
            required: {
              value: true,
              message: "반드시 입력해야합니다!",
            },
          }}
        />

        {/* 썸네일과 시간 / 생성 버튼 부분 */}
        <div className="flex space-x-2 pb-4">
          {/* 썸네일 */}
          <div className="flex-1">
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
              className="group w-full relative border-2 border-teal-400 pt-[100%] rounded-md transition-colors hover:border-teal-300"
              onClick={() => thumbnailRef.current?.click()}
            >
              <div className="group-hover:bg-black/20 group-hover:z-[1] absolute top-[1%] left-[1%] w-[98%] h-[98%] bg-black/10 transition-colors" />
              <Icon
                shape={previewThumbnail ? "change" : "plus"}
                className="group-hover:text-teal-300 group-hover:z-[1] absolute inset-[50%] translate-center h-10 w-10 text-teal-400"
              />
              {previewThumbnail && (
                <Image.Photo
                  path={previewThumbnail}
                  alt="사용자가 업로드한 이미지"
                  className="absolute top-[1%] left-[1%] w-[98%] h-[98%] bg-center bg-cover rounded-sm"
                />
              )}
            </button>
          </div>
          {/* 시간 / 게시글 생성 버튼 */}
          <div className="flex-1 flex flex-col space-y-2 min-w-[142px]">
            {/* 시간 */}
            <p className="font-semibold text-sm bg-teal-400 text-white px-4 py-2 w-full rounded-md before:content-['💡']">
              명대사 시작 시간을 입력해주세요!
            </p>
            {/* 영화인 경우 */}
            {category === "MOVIE" && (
              <>
                <RHF.Input
                  register={register}
                  name="hour"
                  type="number"
                  placeholder="시간을 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  name="minute"
                  type="number"
                  placeholder="분을 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  name="second"
                  type="number"
                  placeholder="초를 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
              </>
            )}
            {/* 드라마인 경우 */}
            {category === "DRAMA" && (
              <>
                <RHF.Input
                  register={register}
                  name="episode"
                  type="number"
                  placeholder="몇 화인지 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  name="hour"
                  type="number"
                  placeholder="시간을 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  name="minute"
                  type="number"
                  placeholder="분을 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
                <RHF.Input
                  register={register}
                  name="second"
                  type="number"
                  placeholder="초를 숫자만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
              </>
            )}
            {/* 도서인 경우 */}
            {category === "BOOK" && (
              <>
                <RHF.Input
                  register={register}
                  name="page"
                  type="number"
                  placeholder="페이지를 숫자로만 입력해주세요!"
                  className="border-teal-400 border-2 rounded-sm px-2 py-1 focus:outline-none focus:border-teal-500 placeholder:text-sm"
                />
              </>
            )}

            <div className="flex-1" />

            {/* 게시글 생성 버튼  */}
            <RHF.Button
              type="submit"
              className="self-end bg-teal-400 text-white px-4 py-2 rounded-md font-bold text-sm transition-colors hover:bg-teal-500"
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
