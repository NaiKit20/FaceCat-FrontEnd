import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/loginPage/loginPage";
import RegisterPage from "./page/registerPage/registerPage";
import HomePage from "./page/homePage/homePage";
import AdminPage from "./page/adminPage/adminPage";
import VotePage from "./page/votePage/votePage";
import RankPage from "./page/rankPage/rankPage";
import ProfilePage from "./page/profilePage/profilePage";
import EditProfilePage from "./page/editProfilePage/editProfilePage";
import DetailImagePage from "./page/detailImagePage/detailImagePage";
import UserInfoPage from "./page/infoPage/userInfoPage";

const routers = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/home", element: <HomePage />, 
    children: [
      { path: "/home", element: <VotePage /> },
      { path: "/home/rank", element: <RankPage /> },
      { path: "/home/profile", element: <ProfilePage /> },
      { path: "/home/profile/:mid", element: <DetailImagePage /> },
      { path: "/home/profile/edit", element: <EditProfilePage /> },
      { path: "/home/profile/info/:uid", element: <UserInfoPage /> },
    ]},
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
