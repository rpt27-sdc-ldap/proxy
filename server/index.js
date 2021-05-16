const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const app = express();

const port = 5500;
const proxy = httpProxy.createProxyServer();
const priceServer = 'http://localhost:3000';
const titleServer = 'http://localhost:2002';
const reviewsServer = 'http://localhost:4000';
const summaryServer = 'http://localhost:1220';

app.use(express.static(path.join(__dirname, '..', '/public')));


app.all('/api/price/*', (req, res) => {
  console.log('proxying request to price server');
  proxy.web(req, res, {target: priceServer});
});
app.all('/api/book/*', (req, res) => {
  console.log('proxying request to title server');
  proxy.web(req, res, {target: titleServer});
});
app.all('/api/books', (req, res) => {
  console.log('proxying request to title server');
  proxy.web(req, res, {target: titleServer});
});
app.all('/reviews/*', (req, res) => {
  console.log('proxying request to reviews server');
  proxy.web(req, res, {target: reviewsServer});
});
app.all('/api/summary/*', (req, res) => {
  console.log('proxying request to summary server');
  proxy.web(req, res, {target: summaryServer});
});


app.listen(port, () => {
  console.log(`Proxy listening on http://localhost:${port}`)
})