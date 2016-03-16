// Created by: Jason Dudash
// https://github.com/dudash
//
// (C) 2016 Red Hat
//
// Released under the terms of MIT License
// https://opensource.org/licenses/MIT

// This file defines the routes exposed as an API for the webservice
// if you update this, please also update the corresponding /api/swagger/swagger.yaml documentation

var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
router.get('/boardslist/', function(req, res, next) {
  res.send('user specific boards are not available');
});

module.exports = router;