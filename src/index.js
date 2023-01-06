const express = require('express');
const {sequelize} = require('./models')

const {handleErrors} = require('./helpers/error');
const configs = require('./config');

const app = express();
app.use(express.json());
app.use(express.static('.'));

sequelize.sync({ alter: true });

const v1 = require('./routers/v1');
app.use('/capstone/v1',v1);

app.use(handleErrors);

app.listen(configs.PORT);