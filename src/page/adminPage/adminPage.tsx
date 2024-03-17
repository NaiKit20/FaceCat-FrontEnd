import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../component/Header-Admin";

function AdminPage() {
    return (
        <>
        <HeaderAdmin></HeaderAdmin>
        <Outlet />
        </>
    )
}

export default AdminPage;