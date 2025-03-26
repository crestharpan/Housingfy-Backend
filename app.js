const express = require('express');
const app = express();
const path = require('path');

const pug = require('pug');
const agentRouter = require('./routes/agentRouter');
const propertiesRouter = require('./routes/propertiesRouter');
const customerRouter = require('./routes/customerRouter');
const viewRouter = require('./routes/viewsRouter');
const adminRouter = require('./routes/adminRouter');
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// if (process.env.NODE_ENV === 'development') {

// }
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev')); //it will return the req

app.use(express.static('public'));

app.use('/api/V1/admin/agents', agentRouter);
app.use('/api/V1/admin/properties', propertiesRouter);
app.use('/api/V1/admin/customers', customerRouter);
app.use('/api/V1/admin', adminRouter);

//INCLUDING THE VIEWS
app.use('/', viewRouter);
module.exports = app;
