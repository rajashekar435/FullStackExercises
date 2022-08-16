const morgan = require('morgan');
const requestLogger = morgan('tiny');

const errorHandler = (error, request, response, next) =>{
    console.log(error.message);

    if(error.name === "ValidationError"){
        return response.status(400).send({error: error.message});
    }
    next();
}

module.exports = { errorHandler, requestLogger };