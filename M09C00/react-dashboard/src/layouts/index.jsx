import Sidebar from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Footer } from "../components/Footer";
import "./App.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div  className="w-100 d-flex flex-column">
          <TopBar />
          <div className="container-fluid flex-grow-1">
            <div className="d-sm-flex align-items-center justify-content-between ">
              <h1 className="h3 mb-3 text-gray-800">App Dashboard</h1>
            </div>
            <Outlet/>
          </div>
          <Footer />
      </div>
    </div>
  );
};
