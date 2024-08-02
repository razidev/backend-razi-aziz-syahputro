require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const merchantRoutes = require('./routes/merchant');
const customerRoutes = require('./routes/customer');

app.use(bodyParser.json());
app.use('/merchant', merchantRoutes);
app.use('/customer', customerRoutes);

app.listen(process.env.PORT, () =>
    console.log(`server is available on port ${process.env.PORT}!`));