// Created by: Jason Dudash
// https://github.com/dudash
//
// (C) 2016 Red Hat
//
// Released under the terms of MIT License
// https://opensource.org/licenses/MIT

// This file defines the routes exposed for the website user management
//
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {"user" : null});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user specific boards are not available');
});


module.exports = router;
