import { Outlet } from "react-router-dom";
import Header from "./Header";

// toDo: Provide context with user data and pass it down to the header so it shows the adequate options.
const Layout = () => {
    <>
        <Header />
        <Outlet /> 
    </>
}

export default Layout;