import axios from 'axios';
import token from './auth_token';
import winston from './winston_config';

const LocalStrategy = require('passport-local').Strategy;


function passportConfig(passport) {
  passport.use(new LocalStrategy(
    (async (username, password, done) => {
      try {
        const result = await axios.post('http://localhost:3000/login', { username, password, token });
        if (!(result.data)) {
          return done(null, false);
        }
        return done(null, result.data);
      } catch (err) {
        return done(err, false);
      }
    }),
  ));

  passport.serializeUser((username, done) => {
    if (!username) {
      done(null, false);
    }
    winston.logger.info(`${username} logged in`);
    done(null, username);
  });

  passport.deserializeUser(async (username, done) => {
    if (!username) {
      done(null, false);
    } else {
      try {
        done(null, username);
      } catch (err) {
        winston.logger.info(err);
        done(err, username);
      }
    }
  });
}

export default passportConfig;
