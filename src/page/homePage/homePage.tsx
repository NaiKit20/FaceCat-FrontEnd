import { Outlet } from "react-router-dom";
import Header from "../../component/Header";
import HeaderGuest from "../../component/Header-Guest";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);

  return (
    <>
      {user != null ? <Header></Header> : <HeaderGuest></HeaderGuest>}
      <Outlet />
    </>
  );
}

export default HomePage;
