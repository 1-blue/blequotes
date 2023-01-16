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
import Book from "@src/components/Page/Book";
import Search from "@src/components/Page/Search";
import Post from "@src/components/Page/Post";
import Write from "@src/components/Page/Write";
import NotFoundPage from "@src/components/Page/404";

// component
import Layout from "@src/components/Layout";
import App from "@src/components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    {/* <React.StrictMode> */}
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
            <Route path="/book" element={<Book />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/post/:title" element={<Post />}></Route>
            <Route path="/write/:title" element={<Write />}></Route>
            <Route path="*" element={<NotFoundPage.All />}></Route>
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={2500}
            theme="dark"
          />
        </Layout>
      </BrowserRouter>
    </Provider>
    {/* </React.StrictMode> */}
  </>
);
