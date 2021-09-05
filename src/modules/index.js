const express = require('express');
const routes = express.Router();

const movieRoutes = require('./movies/routes');
const userRoutes = require('./users/routes');
const rentRoutes = require('./rent/routes');

routes.use(movieRoutes);
routes.use(userRoutes);
routes.use(rentRoutes);

module.exports = routes;