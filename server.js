const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(
  require('express-session')
);

dotenv.config({ path: './config.env' });

const port = process.env.PORT;

const Db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const store = new MongoDBStore({
  uri: process.env.SESSION_DB_URI || 'mongodb://localhost:27017/sessionDB', // Use environment variable or default to local
  collection: 'sessions', // Sessions collection
});
mongoose.connect(Db).then(() => console.log('DB connection Successful'));
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
