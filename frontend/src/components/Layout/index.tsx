// component
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />

      <Main>{children}</Main>

      <Footer />
    </>
  );
};

export default Layout;
