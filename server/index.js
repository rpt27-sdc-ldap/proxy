const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('./s3-connect.js');

const port = 5500;
const priceServer = 'http://ec2-34-221-235-141.us-west-2.compute.amazonaws.com:3000';
const titleServer = 'http://13.57.14.144:2002';
const reviewsServer = 'http://ec2-54-67-73-166.us-west-1.compute.amazonaws.com:4001';
const summaryServer = 'http://ec2-18-188-135-5.us-east-2.compute.amazonaws.com:1220';

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/files/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  let key;
  if (!fileName) {
    res.end();
  }
  if (fileName.split('.')[1] === 'js') {
    key = 'scripts/' + fileName;
  } else if (fileName === 'style.css') {
    key = 'styles/summary-styles/style.css';
  } else if (fileName === 'styles.css') {
    key = 'styles/price-styles/styles.css';
  } else {
    res.end();
  }

  const readFile = async (key) => {
    const convertToStr = (stream) => {
      return new Promise((resolve, reject) => {
        let data = [];
        stream.on('data', (chunk) => data.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(data).toString('utf8')));
      });
    }

    try {
      // data returned as readable string
      const data = await s3.send(new GetObjectCommand({Bucket: 'rpt27-fec-audible', Key: key}));

      const readData = await convertToStr(data.Body);
      return readData;
    } catch (err) {
      console.log("Error! with getting file ", key, err);
    }
  };

  const file = await readFile(key);
  res.send(file);

});


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
  console.log(`Proxy listening on http://ec2-34-219-131-242.us-west-2.compute.amazonaws.com:${port}`)
})