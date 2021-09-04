const express = require('express');
const routes = express.Router();

const movieRoutes = require('./movies/routes');
const userRoutes = require('./users/routes');

routes.use(movieRoutes);
routes.use(userRoutes);

module.exports = routes;