
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const winston = require('../winston/config.js');


const app = express();
const loginSignUp = require('../router/loginSignUp');
const players = require('../router/players.js');
const matches = require('../router/matches.js');
const passportConfig = require('../config/authConfig.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
passportConfig(passport);
app.use(session({ secret: 'yefaydfcavdfva3210d' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginSignUp);
app.use('/players', players);
app.use('/matches', matches);


app.listen(4000);
