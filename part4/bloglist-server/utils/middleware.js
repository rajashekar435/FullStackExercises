const morgan = require('morgan');
const requestLogger = morgan('tiny');

const errorHandler = (error, request, response, next) =>{
    console.log(error.message);

    next();
}

module.exports = { errorHandler, requestLogger };