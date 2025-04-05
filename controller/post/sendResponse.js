const sendResponse = (res, statusCode, status, message, data = null, error = null ) => {

    if (res.headersSent) {
        console.warn("Headers already sent, response not sent again.");
        return;
    }

    const response = {
        status,
        message
    }

    if (data) response.data = data
    if (error) response.error = error

    res.status(statusCode).json(response)
}

module.exports = sendResponse