import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between p-4 bg-gray-600 text-white text-center text-sm sm:text-base">
      <ul className="text-left space-y-1">
        <li>FrontEnd: React.js</li>
        <li>BackEnd: Node.js</li>
        <li>Database: Mysql</li>
        <li>Deploy: AWS-EC2</li>

        <div className="flex flex-col items-start space-y-1">
          <a
            href="https://developers.themoviedb.org/3"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline hover:text-main-400 focus:outline-none focus:underline focus:text-main-500"
          >
            MovieDB - 영화 및 드라마 API
          </a>
          <a
            href="https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline hover:text-main-400 focus:outline-none focus:underline focus:text-main-500"
          >
            Kakao - 도서 API
          </a>
        </div>
      </ul>

      <ul className="flex flex-col text-left space-y-1 font-bold">
        <a
          href="https://github.com/1-blue"
          target="_blank"
          rel="noreferrer"
          className="flex items-center underline-offset-4 fill-white hover:underline focus:outline-none focus:underline hover:text-main-400 focus:text-main-500 hover:fill-main-400 focus:fill-main-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            className="w-5 h-5 mr-1"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href="https://1-blue.github.io/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center underline-offset-4 fill-white hover:underline focus:outline-none focus:underline hover:text-main-400 focus:text-main-500 hover:fill-main-400 focus:fill-main-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            className="w-5 h-5 mr-1"
          >
            <path d="M17.6,4.2L12.3,34C7.3,31.2,4,25.9,4,20C4,12,9.9,5.4,17.6,4.2 M20,2C10.1,2,2,10.1,2,20C2,27.8,7,34.4,13.9,36.9L20,2L20,2z" />
            <path d="M22.4,4.2C30.1,5.4,36,12,36,20c0,5.9-3.3,11.2-8.3,14L22.4,4.2 M20,2l6.2,34.9C33.1,34.4,38,27.8,38,20C38,10.1,30,2,20,2L20,2z" />
          </svg>
          <span>Blog</span>
        </a>
        <a
          href="mailto:1-blue98@naver.com"
          className="flex items-center underline-offset-4 fill-white hover:underline focus:outline-none focus:underline hover:text-main-400 focus:text-main-500 hover:fill-main-400 focus:fill-main-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 mr-1"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>
          <span>Email</span>
        </a>
        <a
          href="tel:010-2103-8259"
          className="flex items-center underline-offset-4 fill-white hover:underline focus:outline-none focus:underline hover:text-main-400 focus:text-main-500 hover:fill-main-400 focus:fill-main-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-5 h-5 mr-1"
          >
            <path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
          </svg>
          <span>Phone</span>
        </a>
      </ul>
    </footer>
  );
};

export default React.memo(Footer);
