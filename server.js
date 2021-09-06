const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/modules/index');
const swaggerFile = require('./swagger.json');

const app = express();
app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);
app.listen(3333, () => console.log('o servidor está rodando'));