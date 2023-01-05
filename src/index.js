const express = require('express');

const {handleErrors} = require('./helpers/error');
const configs = require('./config');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const v1 = require('./routers/v1');
app.use('capstone/v1',v1);

app.use(handleErrors);

app.listen(configs.PORT);