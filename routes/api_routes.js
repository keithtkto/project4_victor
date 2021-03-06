var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersCtrl = require('../controllers/users');
var regimensCtrl = require('../controllers/regimens');
var recordsCtrl = require('../controllers/records');


// Require token authentication.
var token = require('../config/token_auth');

// users resource paths:
router.post('/users',    usersCtrl.create);
router.get( '/users/me', token.authenticate, usersCtrl.me);
router.put( '/users/me', token.authenticate, usersCtrl.update);
// user regimen paths
router.get( '/me/regimens', token.authenticate, regimensCtrl.index);
router.post( '/me/regimens', token.authenticate, regimensCtrl.create);
router.put( '/me/regimens', token.authenticate, regimensCtrl.update);
router.delete( '/me/regimens', token.authenticate, regimensCtrl.destroy);
// user record paths
router.get( '/me/records', token.authenticate, recordsCtrl.index);
router.put( '/me/records', token.authenticate, recordsCtrl.edit);





// token paths
router.post('/token', token.create);
router.post('/users/me/token', token.authenticate, token.refresh);

module.exports = router;
