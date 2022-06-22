const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //middleware
const connectDB = require('./config/db');


// Route files
const students = require('./routes/students');

dotenv.config({ path: './config/config.env'});

connectDB();

const PORT = process.env.PORT || 3005;

const app = express();
// Parse JSON
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

//Static Path -- index
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/students', students);


//listen very last
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})