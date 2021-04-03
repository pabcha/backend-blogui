require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const PostService = require('./services/post');

const app = express();
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.use(cors({ credentials: true }));
app.use(bodyParser.json());

app.get('/api/posts', function(req, res) {
  PostService.all()
    .then(({ posts }) => {
      res.json({ data: posts });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

app.get('/api/posts/:slug', function(req, res) {
  const slug = req.params.slug;

  PostService.get(slug)
    .then(({ post }) => {
      res.json({ data: post });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

app.get('/', function(req, res) {
  res.send('Welcome to my api.');
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));