import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// router
import movieRouter from "./routes/movie";
import dramaRouter from "./routes/drama";
import bookRouter from "./routes/book";
import imageRouter from "./routes/image";
import postRouter from "./routes/post";

// hanlder
import { errorHandler } from "./handler";

// type
import type { Request, Response } from "express";

const app = express();
app.set("port", 3050);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// >>> 배포 URL 정해지면 수정
const corsOrigin =
  process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : [""];
app.use(cors({ credentials: true, origin: corsOrigin }));

// >>> 배포 전에 API문서로 바꾸기
app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

// router 연결
app.use("/api/movie", movieRouter);
app.use("/api/drama", dramaRouter);
app.use("/api/book", bookRouter);
app.use("/api/image", imageRouter);
app.use("/api/post", postRouter);

// error 처리 핸들러(미들웨어)
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 실행중...`);
});
