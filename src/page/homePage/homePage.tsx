import { Outlet } from "react-router-dom";
import Header from "../../component/Header";

function HomePage() {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  )
}

export default HomePage;