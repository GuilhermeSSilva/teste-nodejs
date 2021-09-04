const express = require('express');
const routes = require('./src/modules/movies/routes');

const app = express();

app.use(express.json());
app.use(routes);
app.listen(3333, () => console.log('o servidor está rodando'));