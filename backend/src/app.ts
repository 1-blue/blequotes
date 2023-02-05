import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

// router
import movieRouter from "./routes/movie";
import dramaRouter from "./routes/drama";
import bookRouter from "./routes/book";
import imageRouter from "./routes/image";
import postRouter from "./routes/post";

// hanlder
import { errorHandler } from "./handler";

const app = express();
app.set("port", 3050);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// deploy
app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

// FIXME: 배포 URL 정해지면 수정
const corsOrigin =
  process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : [""];
app.use(cors({ credentials: true, origin: corsOrigin }));

// router 연결
app.use("/api/movie", movieRouter);
app.use("/api/drama", dramaRouter);
app.use("/api/book", bookRouter);
app.use("/api/image", imageRouter);
app.use("/api/post", postRouter);

// error 처리 핸들러 ( 미들웨어 )
app.use(errorHandler);

// SPA routing 새로고침 문제 해결을 위한 코드
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 실행중...`);
});
