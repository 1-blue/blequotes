namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NODE_ENV: "development" | "production";

    REACT_APP_API_URL: string;

    REACT_APP_MOVIE_IMAGE_URL: string;
  }
}
