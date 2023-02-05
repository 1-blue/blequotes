# 😶 명대사 커뮤니티
영화 / 드라마 / 도서의 명대사를 간단하게 작성하는 커뮤니티 프론트엔드 부분입니다.<br />

<section align="center">
  <h2 style="text-align: center; margin: 0;">🧑‍💻 사용한 기술 🧑‍💻</h2>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-36aac4?style=flat-square&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=flat-square&logo=TailwindCss&logoColor=white" />
  <img src="https://img.shields.io/badge/ReduxToolkit-764ABC?style=flat-square&logo=Redux&logoColor=white" />
  <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=flat-square&logo=ReactHookForm&logoColor=white" />
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
1. `Image Carousel` ( `react-slick` 사용 )
2. 명대사 등록 기능 ( `AWS-S3`의 `presignedURL` 기능을 이용한 이미지 등록 ) FIXME: URL 등록
3. 명대사에 좋아요 및 싫어요 기능
4. 영화 / 드라마 / 도서 검색 기능 ( [`Debouncing`](https://1-blue.github.io/posts/%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81-%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98/#%EF%B8%8F-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1--debouncing-) 사용 )
5. 무한 스크롤링 ( [`Intersection-Observer`](https://1-blue.github.io/posts/Intersection-Observer-API/) 사용 )
6. `React-ToolKit`을 이용한 전역 상태 관리

# 🍀 제작 환경
1. OS: `Window11`
2. editor: `VSCode`, `Sourcetree`
3. terminal: `git bash`
4. Database: `Mysql`
6. vcs: `Git` / `GitHub`
7. Front: `React.js`
8. Back: `Node` `Express`
9. 이미지 저장소: `AWS S3`
10. 배포: AWS-EC2 예정 ( 배포하면 수 )

# 📝 가이드라인
## 0️⃣ 종속성 설치
```bash
cd frontend
npm install
```

## 1️⃣ 환경 변수 등록
```
# 서버 URL ( 상황에 맞게 수정 )
REACT_APP_API_URL=http://localhost:3050

# "MovieDB" 이미지 URL
REACT_APP_MOVIE_IMAGE_URL=https://image.tmdb.org/t/p/w500
```

## 2️⃣ 테스트 실행
```bash
npm start
```

## 3️⃣ 빌드
```bash
npm run build
```

# ✍️ 프로젝트 진행 중에 작성한 포스트들
1. [`Redux`](https://1-blue.github.io/posts/Redux/)
2. [`React` 스크롤 방향 찾기](https://1-blue.github.io/posts/React-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%B0%A9%ED%96%A5/)
3. [`React-Router-Dom`의 `replace`](https://1-blue.github.io/posts/React-Router-Dom/)
4. [`AWS-S3` - `presignedURL` 사용 방법](https://1-blue.github.io/posts/AWS-S3-presignedURL/)
5. [`Intersection-Observer-API`와 무한 스크롤링](https://1-blue.github.io/posts/Intersection-Observer-API/)

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