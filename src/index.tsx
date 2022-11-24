import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// css
import "@src/css/tailwind.css";

// store
import store from "@src/store/configureStore";

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
      {/* 전체 레이아웃 ( 네비게이션, 컨텐츠, 푸터 ) */}
      <Layout>
        {/* 라우팅 ( react-router ) */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="*" element={<div>경로없음</div>}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </Provider>
  </React.StrictMode>
);
