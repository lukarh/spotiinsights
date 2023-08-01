const ERROR_MESSAGE = "404 Not Found"
const ERROR_SUBMESSAGE = "The page you requested does not exist."

const NotFound = () => {

    return (
        <div className="centered-column-container">
            <h1 className="text-align-center">{ERROR_MESSAGE}</h1>
            <p className="text-align-center">{ERROR_SUBMESSAGE}</p>
        </div>
    )
}

export default NotFound;