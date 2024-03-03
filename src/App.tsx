import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/loginPage/loginPage";
import RegisterPage from "./page/registerPage/registerPage";
import HomePage from "./page/homePage/homePage";
import AdminPage from "./page/adminPage/adminPage";
import VotePage from "./page/votePage/votePage";

const routers = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/home/:id", element: <HomePage />, 
    children: [
      { path: "/home/:id", element: <VotePage /> },
    ]},
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
