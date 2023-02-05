# 😶 명대사 커뮤니티
영화 / 드라마 / 도서의 명대사를 간단하게 작성하는 커뮤니티 백엔드 부분입니다.<br />

<section align="center">
  <h2 style="text-align: center; margin: 0;">🧑‍💻 사용한 기술 🧑‍💻</h2>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-square&logo=Mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
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
3. 명대사 등록 기능 ( `AWS-S3`의 `presignedURL` 기능을 이용한 이미지 등록 ) FIXME: URL 등록
4. 명대사에 좋아요 및 싫어요 기능
5. 영화 / 드라마 / 도서 검색 기능 ( [`Debouncing`](https://1-blue.github.io/posts/%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81-%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98/#%EF%B8%8F-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1--debouncing-) 사용 )

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
cd backend
npm install
```

## 1️⃣ 환경 변수 등록
```
# 환경 변수 ( production | development )
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

## 2️⃣ 테스트 실행
```bash
npm run dev
```

## 3️⃣ prisma 명령어
```bash
# 가짜 데이터 등록
npx prisma seed

# 데이터 베이스 초기화
npx prisma migrate dev

# 데이터 베이스 초기화 및 가짜 데이터 등록
npx prisma migrate reset
```

# ✍️ 프로젝트 진행 중에 작성한 포스트들
1. [`AWS-S3` - `presignedURL` 사용 방법](https://1-blue.github.io/posts/AWS-S3-presignedURL/)
2. [`Node.js` + `TypeScript` 세팅 방법](https://1-blue.github.io/posts/Setting-NodeJs/)
3. [`prisma` 사용법 정리](https://1-blue.github.io/posts/prisma/)