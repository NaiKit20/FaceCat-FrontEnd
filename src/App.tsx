import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/loginPage/loginPage";
import RegisterPage from "./page/registerPage/registerPage";
import HomePage from "./page/homePage/homePage";
import AdminPage from "./page/adminPage/adminPage";
import VotePage from "./page/votePage/votePage";
import RankPage from "./page/rankPage/rankPage";
import ProfilePage from "./page/profilePage/profilePage";

const routers = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/home/:id", element: <HomePage />, 
    children: [
      { path: "/home/:id", element: <VotePage /> },
      { path: "/home/:id/rank", element: <RankPage /> },
      { path: "/home/:id/profile", element: <ProfilePage /> },
    ]},
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
