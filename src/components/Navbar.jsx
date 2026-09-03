import { Link, NavLink } from "react-router-dom";
import { useGetProfileQuery } from "../features/Profile/profileApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
        const { data, error, isLoading } = useGetProfileQuery();
        const user = data?.[0];
        return (
            <header className="flex flex-col border-white border-b">
                <div className="bg-linear-to-t from-black to-gray-500 sm:h-20 h-10 text-white font-extrabold text-xl sm:text-3xl flex justify-center items-center">
                    E-commerce
                </div>
                <section className="flex flex-col-reverse text-sm bg-black text-white sm:flex sm:flex-row sm:items-center sm:justify-between sm:text-lg md:text-xl px-1 sm:px-16 py-3 ">
                    <nav className="flex justify-around gap-1 sm:gap-10">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ?
                                    "text-gray-400 underline"
                                :   "text-black-500"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                isActive ?
                                    "text-gray-400 underline"
                                :   "text-black-500"
                            }
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/user/profile"
                            className={({ isActive }) =>
                                isActive ?
                                    "text-gray-400 underline"
                                :   "text-black-500"
                            }
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            to="/user/orders"
                            className={({ isActive }) =>
                                isActive ?
                                    "text-gray-400 underline"
                                :   "text-black-500"
                            }
                        >
                            Orders
                        </NavLink>
                        <NavLink
                            to="/user/cart"
                            className={({ isActive }) =>
                                isActive ?
                                    "text-gray-400 underline"
                                :   "text-black-500"
                            }
                        >
                            Cart
                        </NavLink>
                    </nav>
                    <div className="flex justify-end pb-3 pr-3 sm:pr-0 sm:pb-0">
                        {user ?
                            <p>{user.name}
                            <FontAwesomeIcon className="pl-3" icon={faArrowRightFromBracket} />
                            </p>
                        :   <Link to="http://localhost:3000/auth/google">
                                Login
                            </Link>
                        }
                        <p></p>
                    </div>
                </section>
            </header>
        );
};

export default Navbar;
