require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

/**** Routes ****/
const postRoutes = require('./routes/post');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
/*** Middlewares ****/
const errorHandler = require('./middlewares/error');

/*** App ***/
const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.ALLOW_ORIGIN, credentials: true }));
app.use(bodyParser.json());

app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', function(req, res) {
  res.send('Welcome to my api.');
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));