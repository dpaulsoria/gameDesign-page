const express = require('express');
const cors = require('cors');
const path = require('path')

// const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}
app.use(cors(options));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path('index.html'));
});

// routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Listenning on port: ' +  port);
});
