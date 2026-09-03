import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const ProfilePage = () => {
    return (
        <>  
            <Navbar/>
            <div className="w-full bg-grey-500">
                <Outlet/>
            </div>
        </>
    )
}

export default ProfilePage;