import Navbar from "../components/Navbar";
import {
    faNode,
    faPostgresql,
    faReact,
} from "@fortawesome/free-brands-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
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
                <div>
                    <div className="py-2 pl-4 pr-1 pb-4 bg-gray-950 rounded-xl leading-6">
                        <div className="text-xl flex items-center text-red-600">
                            <FontAwesomeIcon
                                className="pr-1"
                                icon={faCircleExclamation}
                            />
                            <p>Please enable third-party cookies</p>
                        </div>
                        <p className="leading-5 text-lg text-gray-400 pl-1">
                            As the frontend is hosted on vercel.com and backend
                            on render.com, Enable third-party cookies to access
                            protected routes
                        </p>
                    </div>
                </div>
                <div className="">
                    <p className="font-bold underline py-1">Technologies</p>
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
