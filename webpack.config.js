const path = require('path');

module.exports = {
  entry: './public/form/chat.js',
  output: {
    filename: 'ws.js',
    path: path.resolve(__dirname, 'public/form'),
  },
};
