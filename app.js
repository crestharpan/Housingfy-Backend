const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const pug = require('pug');
const agentRouter = require('./routes/agentRouter');
const propertiesRouter = require('./routes/propertiesRouter');
const customerRouter = require('./routes/customerRouter');
const viewRouter = require('./routes/viewsRouter');
const adminRouter = require('./routes/adminRouter');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors');

// Enable CORS for the frontend running on port 5173
const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
// if (process.env.NODE_ENV === 'development') {

// }
//PUG CONFIGURATION
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//IT WILL RETURN REQ HEADER
app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/api/V1/admin/agents', agentRouter);
app.use('/api/V1/admin/properties', propertiesRouter);
app.use('/api/V1/admin/customers', customerRouter);
app.use('/api/V1/admin', adminRouter);

//INCLUDING THE VIEWS
app.use('/', viewRouter);
module.exports = app;
