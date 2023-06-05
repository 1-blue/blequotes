# 😶 명대사 커뮤니티
영화 / 드라마 / 도서의 명대사를 간단하게 작성하는 커뮤니티입니다.<br />

<section align="center">
  <h2 style="text-align: center; margin: 0;">🧑‍💻 사용한 기술 🧑‍💻</h2>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-36aac4?style=flat-square&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=flat-square&logo=TailwindCss&logoColor=white" />
  <img src="https://img.shields.io/badge/ReduxToolkit-764ABC?style=flat-square&logo=Redux&logoColor=white" />
  <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=flat-square&logo=ReactHookForm&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-square&logo=Mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white" />
</section>

<section align="center">
  <h2 style="text-align: center; margin: 0;">🔨 사용 툴 🔨</h2>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white" />
  <a href="https://github.com/1-blue/blequotes">
    <img src="https://img.shields.io/badge/GitHub-609926?style=flat-square&logo=GitHub&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white" />
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=flat-square&logo=Sourcetree&logoColor=white" />
  <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white" />
</section>

# 🕹️ 구현 기능
1. [`Movie DB API`](https://developers.themoviedb.org/3)를 이용한 영화 및 드라마들의 각종 정보 패치 및 검색 
2. [`Kakao Book API`](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)를 이용한 도서 검색
3. `Image Carousel` ( `react-slick` 사용 )
4. 명대사 등록 기능 ( [`AWS-S3`의 `presignedURL`](https://1-blue.github.io/posts/AWS-S3-presignedURL)를 이용한 이미지 등록 )
5. 명대사에 좋아요 및 싫어요 기능
6. 영화 / 드라마 / 도서 검색 기능 ( [`Debouncing`](https://1-blue.github.io/posts/%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81-%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98/#%EF%B8%8F-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1--debouncing-) 사용 )
7. 무한 스크롤링 ( [`IntersectionObserver API`](https://1-blue.github.io/posts/Intersection-Observer-API) 사용 )
8. [`Redux-ToolKit`](https://1-blue.github.io/posts/Redux-Toolkit)을 이용한 전역 상태 관리
9. [`Prisma`](https://1-blue.github.io/posts/prisma)를 이용한 `DB`관리 및 데이터 관리
10. [AWS-EC2 + nginx + certbot을 이용한 배포](https://1-blue.github.io/posts/deploy)

# 🍀 제작 환경
1. OS: `Window11`
2. editor: `VSCode`, `Sourcetree` ( + `Notion`, `Figma` )
3. terminal: `git bash`
4. Database: `Mysql`
6. vcs: `Git` / `GitHub`
7. Front: `React.js`
8. Back: `Node`의 `Express`
9. 이미지 저장소: `AWS S3`
10. 배포: `AWS-EC2`

# 📝 가이드라인
## 🙂 프론트 엔드
### 0️⃣ 종속성 설치
```bash
npm install
```

### 1️⃣ 환경 변수 등록
```
# 서버 URL ( 상황에 맞게 수정 )
REACT_APP_API_URL=http://localhost:3050

# "MovieDB" 이미지 URL
REACT_APP_MOVIE_IMAGE_URL=https://image.tmdb.org/t/p/w500
```

### 2️⃣ 테스트 실행
```bash
npm start
```

### 3️⃣ 빌드
```bash
npm run build
```

## 🙃 백엔드
### 0️⃣ 종속성 설치
```bash
cd backend
npm install
```

### 1️⃣ 환경 변수 등록
```
# 환경 변수
NODE_ENV=development

# "Prisma"에서 "Mysql" 연결을 위한
DATABASE_URL="mysql://<유저이름>:<비밀번호>@localhost:3306/<DB이름>"

# "MovieDB" 요청 관련
MOVIE_DB_API_URL=https://api.themoviedb.org/3
MOVIE_DB_API_KEY=<API Key>

# "Kakao Book" 요청 관련
KAKAO_API_URL=https://dapi.kakao.com
KAKAO_API_KEY=<API Key>

# "AWS-S3" 관련
AWS_BUCKET=<버킷명>
AWS_REGION=<사용지역명>
AWS_ACCESS_KEY=<Access Key>
AWS_ACCESS_SECRET_KEY=<Access Secret Key>
```

### 2️⃣ 테스트 실행
```bash
npm run dev
```

### 3️⃣ prisma 명령어
```bash
# 가짜 데이터 등록
npx prisma seed

# 데이터 베이스 초기화
npx prisma migrate dev

# 데이터 베이스 초기화 및 가짜 데이터 등록
npx prisma migrate reset
```

# ✍️ 프로젝트와 관련된 포스트들
1. [`Redux`](https://1-blue.github.io/posts/Redux/)
2. [`React` 스크롤 방향 찾기](https://1-blue.github.io/posts/React-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%B0%A9%ED%96%A5/)
3. [`React-Router-Dom`의 `replace`](https://1-blue.github.io/posts/React-Router-Dom/)
4. [`AWS-S3` - `presignedURL` 사용 방법](https://1-blue.github.io/posts/AWS-S3-presignedURL/)
5. [`Node.js` + `TypeScript` 세팅 방법](https://1-blue.github.io/posts/Setting-NodeJs/)
6. [`IntersectionObserver API`와 무한 스크롤링](https://1-blue.github.io/posts/Intersection-Observer-API/)
7. [`Debouncing`과 사용 예시](https://1-blue.github.io/posts/%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81-%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98/#%EF%B8%8F-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1--debouncing-)
8. [`prisma` 사용법 정리](https://1-blue.github.io/posts/prisma/)
9. [`Redux-ToolKit` + `TypeScript` + `React` 사용 방법](https://1-blue.github.io/posts/Redux-Toolkit/)
10. [`blequotes` 마무리 포스트](https://1-blue.github.io/posts/bleqoutes-%EB%A7%88%EB%AC%B4%EB%A6%AC/)

# 📸 실행 영상
## 0️⃣ 반응형 레이아웃 1
<img alt="반응형 레이아웃 1" src="https://user-images.githubusercontent.com/63289318/216816234-ba332eff-9678-4236-afae-e4631f1fc8f1.gif" width="100%" />

## 1️⃣ 반응형 레이아웃 2
<img alt="반응형 레이아웃 2" src="https://user-images.githubusercontent.com/63289318/216816244-3797aa7e-7825-4d41-b21c-a83f9f63bbc4.gif" width="100%" />

## 2️⃣ 무한 스크롤링
<img alt="무한 스크롤링" src="https://user-images.githubusercontent.com/63289318/216816220-46126747-a1f7-48ef-9fd3-0a156a99b7b3.gif" width="100%" />

## 3️⃣ 스켈레톤 UI
<img alt="스켈레톤 UI" src="https://user-images.githubusercontent.com/63289318/216816186-2293b7d4-7cd1-4426-a937-f7da664864a6.gif" width="100%" />

## 4️⃣ 검색
<img alt="검색" src="https://user-images.githubusercontent.com/63289318/216816215-de5741a1-5bef-41bb-929f-ee5a2d18ea90.gif" width="100%" />

## 5️⃣ 게시글 생성
<img alt="게시글 생성" src="https://user-images.githubusercontent.com/63289318/216815910-6e79e03e-6740-4e3a-8deb-6d8bd366c81d.gif" width="100%" />

  
# 🤝 API
```ts
type ApiType = "axios" | "prisma" | "unknown";

// 성공 시 response 타입
type ApiResponse<T> = {
  meta: { ok: boolean; type?: ApiType };
  data: { message: string } & T;
};

// 500 실패 시 response 타입
type ApiErrorResponse = ApiResponse<{}>;
```

## 0️⃣ Movie
```ts
// 요청할 영화 카테고리 ( 인기, 현재 상영 등 )
type MovieCategory = "popular" | "top_rated" | "now_playing";

// 영화 언어 
type MovieLanguage = "ko-kr" | "en-us";

// 영화 타입
type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

// 영화 상세 타입
type DetailMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
```

### 1. 인기 / 최신 / 꾸준한 인기 영화들 요청
`GET` - `api/movie`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type FetchMoviesRequest = {
  category: MovieCategory;
  language?: MovieLanguage;
};
```

+ `response`
```ts
type FetchMoviesResponse = ApiResponse<{ movies: Movie[] }>
```

### 2. 영화 검색 요청
`GET` - `api/movie/search`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SearchMoviesRequest = {
  title: string;
  language?: MovieLanguage;
};
```

+ `response`
```ts
type SearchMoviesResponse = ApiResponse<{ movies: Movie[] }>
```

### 3. 영화 추천 검색어들 요청
`GET` - `api/movie/suggested`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SuggestMoviesRequest = {
  keyword: string;
  language?: MovieLanguage;
};
```

+ `response`
```ts
type SearchMoviesResponse = ApiResponse<{ titles: string[] }>
```

### 4. 유사 영화들 요청
`GET` - `api/movie/similar`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SimilarMoviesRequest = {
  movieIdx: string; // "Movie DB"에서 제공한 식별자
  language?: MovieLanguage;
};
```

+ `response`
```ts
type SimilarMoviesResponse = ApiResponse<{ movies: Movie[] }>
```

### 5. 특정 영화 상세 정보 요청
`GET` - `api/movie/detail`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type DetailMovieRequest = {
  movieIdx: string; // "Movie DB"에서 제공한 식별자
  language?: MovieLanguage;
};
```

+ `response`
```ts
type DetailMovieResponse = ApiResponse<{ movie: DetailMovie }>
```

## 1️⃣ Drama
```ts
// 요청할 드라마 카테고리 ( 인기, 현재 상영 등 )
type DramaCategory = "popular" | "top_rated" | "on_the_air";

// 드라마 언어
type DramaLanguage = "ko-kr" | "en-us";

// 드라마 타입
type Drama = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

// 드라마 상세 타입
type DetailDrama = {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air: null | string;
  networks: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
```

### 1. 인기 / 최신 / 꾸준한 인기 드라마들 요청
`GET` - `api/drama`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type FetchDramasRequest = {
  category: DramaCategory;
  language?: DramaLanguage;
};
```

+ `response`
```ts
type DetailBookResponse = ApiResponse<{ dramas: Drama[] }>
```

### 2. 드라마 검색 요청
`GET` - `api/drama/search`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SearchDramasRequest = {
  title: string;
  language?: DramaLanguage;
};
```

+ `response`
```ts
type SearchDramasResponse = ApiResponse<{ dramas: Drama[] }>
```

### 3. 드라마 추천 검색어들 요청
`GET` - `api/drama/suggested`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SuggestDramasRequest = {
  keyword: string;
  language?: DramaLanguage;
};
```

+ `response`
```ts
type SuggestDramasResponse = ApiResponse<{ titles: string[] }>
```

### 4. 유사 드라마들 요청
`GET` - `api/drama/similar`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SimilarDramasRequest = {
  dramaIdx: string; // "Movie DB"에서 제공한 식별자
  language?: DramaLanguage;
};
```

+ `response`
```ts
type SimilarDramasResponse = ApiResponse<{ dramas: Drama[] }>
```

### 5. 특정 드라마 상셍 정보 요청
`GET` - `api/drama/detail`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type DetailDramaRequest = {
  dramaIdx: string; // "Movie DB"에서 제공한 식별자
  language?: DramaLanguage;
};
```

+ `response`
```ts
type DetailDramaResponse = ApiResponse<{ drama: DetailDrama }>
```


## 2️⃣ Book
```ts
// 도서 타입
type Book = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};
```

### 1. 특정 도서 검색 요청
`GET` - `api/book/search`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SearchBooksRequest = {
  title: string;
};
```

+ `response`
```ts
type SearchBooksResponse = ApiResponse<{ books: Book[] }>
```

### 2. 도서 추천 검색어들 요청
`GET` - `api/book/suggested`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SuggestedBooksRequest = {
  keyword: string;
};
```

+ `response`
```ts
type SuggestedBooksResponse = ApiResponse<{ titles: string[] }>
```

### 3. 특정 도서와 유사한 도서들 요청
`GET` - `api/book/similar`<br />
( 저자 기준으로 유사 도서 검색 )<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type SimilarBooksRequest = {
  author: string;
};
```

+ `response`
```ts
type SimilarBooksResponse = ApiResponse<{ books: Book[] }>
```

### 4. 특정 도서의 상세 정보 요청
`GET` - `api/book/detail`<br />

+ `Status Code`
  1. `200`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type DetailBookRequest = {
  bookIdx: string; // "Movie DB"에서 사용하는 식별자
};
```

+ `response`
```ts
type DetailBookResponse = ApiResponse<{ book: Book }>
```


## 3️⃣ Image
### 1. S3에 presignedURL 요청
`GET` - `api/image`<br />

+ `Status Code`
  1. `201`: 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type FetchPresignedURLRequest = {
  name: string;
};
```

+ `response`
```ts
type FetchPresignedURLResponse = ApiResponse<{ preSignedURL: string }>
```

## 4️⃣ Post
```ts
export const PostCategory: {
  MOVIE: 'MOVIE',
  DRAMA: 'DRAMA',
  BOOK: 'BOOK'
};

// 게시글 카테고리 ( 영화, 드라마, 도서 )
export type PostCategory = (typeof PostCategory)[keyof typeof PostCategory]

// 게시글들 정렬 기준
type PostSortBy = "popular" | "latest";

// 게시글
type Post = {
  id: number
  idx: string
  title: string
  category: PostCategory
  speech: string
  like: number
  hate: number
  updatedAt: Date
  time: string | null
  episode: number | null
  page: number | null
  thumbnail: string
}
```

+ `take`: 요청한 개수
+ `lastId`: 최근에 요청한 마지막 게시글의 식별자 ( 이 값을 기준으로 응답할 게시글을 결정 )

### 1. 게시글 생성 요청
`POST` - `api/post`<br />

+ `Status Code`
  1. `201`: 게시글 생성 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type CreatePostRequest = {
  idx: string;
  title: string;
  category: PostCategory;
  speech: string;
  thumbnail: string;

  // 영화 / 드라마 용
  time?: string;

  // 드라마 용
  episode?: number;

  // 도서 용
  page?: number;
};
```

+ `response`
```ts
type CreatePostResponse = ApiResponse<{}>
```

### 2. 게시글들 가져오기 요청
`GET` - `api/post`<br />

+ `Status Code`
  1. `200`: 게시글들 가져오기 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type GetPostsRequest = {
  category: "ALL" | PostCategory;
  sortBy: PostSortBy;
  take: number;
  lastId: number;
};
```

+ `response`
```ts
type GetPostsResponse = ApiResponse<{
  take: number; // 마지막 게시글인지 판단하기 위해 보냄
  category: "ALL" | PostCategory;
  posts: Post[];
}>
```

### 3. 특정 게시글 좋아요/싫어요 요청
`POST` - `api/post/like`<br />

+ `Status Code`
  1. `200`: 좋아요/싫어요 성공
  2. `404`: 존재하지 않은 게시글에 요청함
  3. `500`: 서버 문제 실패

+ `request`
```ts
type UpdateLikeOrHateRequest = {
  id: number;
  already: boolean; // 이미 좋아요/싫어요를 눌렀는지 여부
  isLike: boolean; // 좋아요를 눌렀는지 / 싫어요를 눌렀는지
  isDuplication: boolean; // 좋아요를 누른 상태에서 다시 좋아요 / 싫어요를 누른 상태에서 다시 싫어요를 눌렀는지
}
```

+ `response`
```ts
type GetPostsResponse = ApiResponse<{ resultPost?: Post }>
```

### 4. 특정 대상의 게시글들 요청
`GET` - `api/post/:idx`<br />

+ `Status Code`
  1. `200`: 좋아요/싫어요 성공
  2. `500`: 서버 문제 실패

+ `request`
```ts
type GetPostsOfTargetRequest = {
  idx: string;
  sortBy: PostSortBy;
  take: number;
  lastId: number;
}
```

+ `response`
```ts
type GetPostsOfTargetResponse = ApiResponse<{
  take: number;  // 마지막 게시글인지 판단하기 위해 보냄
  posts: Post[];
}>
```
