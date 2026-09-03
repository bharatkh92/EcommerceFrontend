import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = (error) => {
    return (
        <div className="bg-gray-950 text-white flex flex-col gap-1 sm:gap-3 py-30 sm:py-50 justify-center items-center h-20">
            <p className="text-base sm:text-2xl">
                Something Went Wrong
                <FontAwesomeIcon icon={faExclamation} />
            </p>
            <p className="text-xs sm:text-xl font-bold">
                <span>{error?.error?.status}: </span>
                <span className="text-red-700">
                    {error?.error?.data?.error}
                </span>
            </p>
        </div>
    );
};

export default ErrorMessage;
