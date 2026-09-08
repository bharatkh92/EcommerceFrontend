import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    faNode,
    faPostgresql,
    faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="w-1/2 m-auto leading-6">
                <div className="text-lg">
                    <p className="text-2xl  underline font-bold py-4">
                        Welcome to E-Commerce
                    </p>
                    <p>A PERN full-stack application</p>
                    <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                            className="text-4xl"
                            icon={faPostgresql}
                        />
                        <p className="text-4xl tracking-tighter pb-3">ex</p>
                        <FontAwesomeIcon className="text-4xl" icon={faReact} />
                        <FontAwesomeIcon className="text-4xl" icon={faNode} />
                    </div>
                </div>
                <div className="">
                    <p className="font-bold underline py-1">
                        Technologies
                    </p>
                    <p className="font-bold py-1">Frontend</p>
                    <p>React</p>
                    <p>React Router</p>
                    <p>RTK Query</p>
                    <p>Tailwind CSS</p>
                    <p>FontAwesome</p>
                    <p className="font-bold py-1">Backend</p>
                    <p>Node.js</p>
                    <p>Express.js</p>
                    <p>Passport.js</p>
                    <p className="font-bold py-1">Database</p>
                    <p>PostgreSQL</p>
                    <p>pg (node-postgres)</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;
