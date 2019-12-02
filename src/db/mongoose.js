const mongoose = require('mongoose')

// revisa tu connectionURL aqui :-)

if (process.env.NODE_ENV == 'production') {
  var connectionURL = process.env.DB_CONNECTION_STRING;
} 
else
{
  const config = require('../config');
  var connectionURL = config.connectionURL;
}

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
