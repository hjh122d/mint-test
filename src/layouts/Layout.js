import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
//import { GlobalStyle } from "../globalStyle";
import Styles from "./styles";

const Container = styled.div`
  /*padding: 20px;*/
`;

const Layout = () => {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Styles.Container>
        {/* <Styles.Background /> */}
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </Styles.Container>
    </>
  );
};

export default Layout;
