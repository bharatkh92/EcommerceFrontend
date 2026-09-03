import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const QueryStateHandler = ({ error, isLoading, children }) => {
    if (error) {
        return <ErrorMessage error={error} />;
    }
    if (isLoading) {
        return <Loading />;
    }
    return children;
};

export default QueryStateHandler;
