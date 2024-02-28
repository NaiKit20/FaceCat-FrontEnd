import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/loginPage/loginPage";
import RegisterPage from "./page/registerPage/registerPage";

const routers = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> }
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
