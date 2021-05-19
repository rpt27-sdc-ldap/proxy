const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const port = 5500;
const priceServer = 'http://localhost:3000';
const titleServer = 'http://localhost:2002';
const reviewsServer = 'http://localhost:4000';
const summaryServer = 'http://localhost:1220';

app.use(express.static(path.join(__dirname, '..', '/public')));


app.all('/api/price/*', (req, res) => {
  const url = (priceServer + req.path).trim();
  console.log('proxying request to price server with method', req.method, 'directed to', url);
  axios({
    method: req.method,
    url: url
  })
    .then((response) => {
      res.send(JSON.stringify(response.data));
    });
});
app.all('/api/book/*', (req, res) => {
  const url = (titleServer + req.path).trim();
  console.log('proxying request to title server with method', req.method, 'directed to', url);
  axios({
    method: req.method,
    url: url
  })
    .then((response) => {
      res.send(JSON.stringify(response.data));
    });
});
app.all('/api/books', (req, res) => {
  const url = (titleServer + req.path).trim();
  console.log('proxying request to title server with method', req.method, 'directed to', url);
  axios({
    method: req.method,
    url: url
  })
    .then((response) => {
      res.send(JSON.stringify(response.data));
    });
});
app.all('/reviews/*', (req, res) => {
  const url = (reviewsServer + req.path).trim();
  console.log('proxying request to reviews server with method', req.method, 'directed to', url);
  axios({
    method: req.method,
    url: url
  })
    .then((response) => {
      res.send(JSON.stringify(response.data));
    });
});
app.all('/api/summary/*', (req, res) => {
  const url = (summaryServer + req.path).trim();
  console.log('proxying request to summary server with method', req.method, 'directed to', url);
  axios({
    method: req.method,
    url: url
  })
    .then((response) => {
      res.send(JSON.stringify(response.data));
    });
});


app.listen(port, () => {
  console.log(`Proxy listening on http://localhost:${port}`)
})