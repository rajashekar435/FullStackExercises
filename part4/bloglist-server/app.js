require("express-async-errors");
const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');


const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);

logger.info(`Connecting to mongoDB`);
mongoose.connect(config.MONGODB_URI);

app.use(middleware.errorHandler);

module.exports = app;