const Server = require('./services/server');
require('dotenv').config();

new Server().serve();
