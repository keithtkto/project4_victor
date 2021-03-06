var _ = require('lodash');

var localEnvVars = {
  TITLE:          'Auth App',
  SAFE_TITLE:     'Victor-app',
  COOKIE_SECRET:  'notsosecretnowareyou',
  SESSION_SECRET: 'anotherfoolishsecret',
  TOKEN_SECRET:   'smeeeeeeeebanana'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
