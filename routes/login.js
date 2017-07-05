var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'ImpactCast - Login', heading:'Login', failedLogin: false});
});

module.exports = router;
