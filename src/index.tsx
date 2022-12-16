import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

// css
import "@src/css/tailwind.css";
import "@src/css/react-slick.css";
import "@src/css/react-toastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

// store
import store from "@src/store/configureStore";

// page
import Movie from "@src/components/Page/Movie";
import Drama from "@src/components/Page/Drama";
import Search from "@src/components/Page/Search";

// component
import Layout from "@src/components/Layout";
import App from "@src/components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Redux-Toolkit */}
    <Provider store={store}>
      {/* 라우팅 ( react-router ) */}
      <BrowserRouter>
        {/* 전체 레이아웃 ( 네비게이션, 컨텐츠, 푸터 ) */}
        <Layout>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/movie" element={<Movie />}></Route>
            <Route path="/drama" element={<Drama />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="*" element={<div>경로없음</div>}></Route>
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={2500}
            theme="dark"
          />
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
