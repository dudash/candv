// Created by: Jason Dudash
// https://github.com/dudash
//
// (C) 2016 Red Hat
//
// Released under the terms of MIT License
// https://opensource.org/licenses/MIT

// This file defines the routes exposed as an API for the webservice
//
// IF YOU UPDATE THIS, please also update the corresponding /api/swagger/swagger.yaml documentation
// ^^^^^^^^^^^^^^^^^^
var express = require('express');
var router = express.Router();
var moment = require('moment');

var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "api"});

const API_PREFIX = "/v0";

var dummyboardslist = [
  { title: 'Global', id: 0 },
  { title: 'Work', id: 2 },
  { title: 'Home', id: 3 },
  { title: 'May Workshop', id: 4 },
];
var dummyitemslist = [
  { id: 0, raw: "copy me", timestamp: 1450797668729},
  { id: 1, raw: "this is a test item", timestamp: 1450797668729},
  { id: 2, raw: "duh 2.0", timestamp: 1450797668729},
  { id: 3, raw: "http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state", timestamp: 1450797668729},
  { id: 4, raw: "http://angular-ui.github.io/bootstrap/", timestamp: 1450797668729},
  { id: 5, raw: "https://openshift.feedhenry.com/", timestamp: 1450797668729},
  { id: 6, raw: "https://www.redhat.com/en/about/value-of-subscription", timestamp: 1450797668729},
  { id: 7, raw: "https://openapis.org/", timestamp: 1450797668729}
];


// -- BOARDS -- 
router.get(API_PREFIX+'/boards/', function(req, res, next) {
  log.info('GET /boards');
// TODO: pull from mongoDB, for now API testing
// TODO: middleware to auth board user has access to list
  var data = dummyboardslist;
  res.json(data);
});
router.post(API_PREFIX+'/boards/', function(req, res, next) {
  log.info('POST /boards');
// TODO: add a new board
  res.send("POST create a new board is not implemented yet");
});


// -- ITEMS -- 
router.get(API_PREFIX+'/boards/:boardId', function(req, res, next) {
  log.info('GET /boards/' + req.params.boardId);
  // for now redirect to items list - future might return more details board info
  res.redirect('/api' + API_PREFIX + '/boards/' + req.params.boardId + '/items/');
});
router.get(API_PREFIX+'/boards/:boardId/items', function(req, res, next) {
  log.info('GET /boards/' + req.params.boardId + '/items');
// TODO: pull from mongoDB, for now API testing
  var data = dummyitemslist;
  res.json(data);
});
router.post(API_PREFIX+'/boards/:boardId/items/', function(req, res, next) {
log.info('POST /boards/' + req.params.boardId + '/items');
// TODO: add a new item to the board
  res.send("POST create a new board is not implemented yet, item not added to board " + req.params.boardId);
});


// -- API -- 
router.get('/', function(req, res, next) {
  log.info('GET /');
  res.send("The latest API is: " + API_PREFIX);
});
// redirect unversioned api requests to the latest API URL
router.get('/*', function(req, res, next) {
  log.info('GET ' + req.url);
  var NEWURL = '/api' + API_PREFIX + req.url;
  log.info('REDIRECTING unversioned request to latest API:' + NEWURL);
  res.redirect(NEWURL);
});

module.exports = router;