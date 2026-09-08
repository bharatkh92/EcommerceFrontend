import { Link, Outlet } from "react-router-dom";
import { formatAgeString } from "../../utils/formatAgeString";
import QueryStateHandler from "../../components/QueryStateHandler";
import { useGetProfileQuery } from "./profileApi.js";

export const Profile = () => {
    const { data, error, isLoading } = useGetProfileQuery();
    const user = data?.[0];
    const accountAge = formatAgeString(user?.created_at);
    const handleClick = () => {};

    return (
        <QueryStateHandler error={error} isLoading={isLoading}>
            {user ?
                <section className="border-white border rounded-lg bg-gray-900 mt-5 w-5/6 sm:w-3/4 text-xs sm:text-xl m-auto">
                    <p className="text-center underline py-3">User Profile</p>
                    <div className="border-white border rounded-lg bg-gray-950 w-8/9 m-auto mt-3 p-5 grid grid-cols-2">
                        <div>
                            <p>User ID</p>
                            <p>Full Name</p>
                            <p>Email</p>
                            <p>Created</p>
                        </div>
                        <div className="text-amber-100">
                            <p>{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{accountAge}</p>
                        </div>
                    </div>
                    <div className="p-5 text-center">
                    <Link to="/user/profile/addresses" className="underline text-blue-400">Addresses</Link>
                    </div>
                </section>
            :   <h1>User Not Logged In</h1>}
            <Outlet />
        </QueryStateHandler>
    );
};

export default Profile;
