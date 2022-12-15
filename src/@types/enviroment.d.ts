namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NOVE_ENV: "development" | "production";

    REACT_APP_MOVIE_DB_API_URL: string;
    REACT_APP_MOVIE_DB_API_KEY: string;
    REACT_APP_MOVIE_IMAGE_URL: string;
  }
}
