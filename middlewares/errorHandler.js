const sendResponse = require('../controller/post/sendResponse')

const errorHandler = (err, req, res, next) => {

    sendResponse(res, 500, 'error', 'Internal Error', null, err.message || 'Unknown Error');

}

module.exports = errorHandler