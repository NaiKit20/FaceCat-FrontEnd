import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/loginPage/loginPage";
import RegisterPage from "./page/registerPage/registerPage";
import HomePage from "./page/homePage/homePage";
import AdminPage from "./page/adminPage/adminPage";

const routers = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/home/:id", element: <HomePage /> },
  { path: "/admin", element: <AdminPage /> }
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
