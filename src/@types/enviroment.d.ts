namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NOVE_ENV: "development" | "production";

    REACT_APP_API_URL: string;
  }
}
