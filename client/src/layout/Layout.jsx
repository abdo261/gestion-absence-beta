import { Outlet } from "react-router-dom";
import Sidebar from "../components/template/sidbar/Sidebar";
import "./layout.css";
import Header from "../components/template/header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
     
      </main>
    </>
  );
};

export default Layout;
