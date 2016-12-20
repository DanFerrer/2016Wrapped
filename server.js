/* eslint no-console: 0 */

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('server/config.js');
const mongoose = require('mongoose');
const morgan = require('morgan');

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? 8000 : process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

if (isDevelopment) {
  const bundle = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(morgan('dev'));
  app.use(middleware);
  app.use(webpackHotMiddleware(bundle));

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + 'public'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.info(`🌎 Listening on port ${port} 🌎`);
});

