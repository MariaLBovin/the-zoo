import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const Layout = () => {
  return (
    <>
      <Header></Header>

      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
