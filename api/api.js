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

// -- BOARDS -- 

// get boards list
router.get(API_PREFIX+'/boards/', function(req, res, next) {
  log.info('GET /boards');
  // FUTURE: middleware to check auth on boards user has access to list
  var db = req.db;
  // FUTURE: pull from mongoDB, for we only support a single global board
  var boards = [{ title: 'Global', id: 0 }];
  res.json(boards);
});

// get info about a board
router.get(API_PREFIX+'/boards/:boardId', function(req, res, next) {
  log.info('GET /boards/' + req.params.boardId);
  // FUTURE: for now redirect to items list - future might return more details about board itself
  res.redirect('/api' + API_PREFIX + '/boards/' + req.params.boardId + '/items/');
});

// create a new board
router.post(API_PREFIX+'/boards/', function(req, res, next) {
  log.info('POST /boards');
  // FUTURE: add a new board to mongodb
  res.status(405).send("POST create a new board is not implemented yet");
});


// -- ITEMS -- 

// get a board item list
router.get(API_PREFIX+'/boards/:boardId/items', function(req, res, next) {
  log.info('GET /boards/' + req.params.boardId + '/items');
  // FUTURE: middleware to check auth if user has access to list items in this board
  var db = req.db;
  // FUTURE: for we only support a single global board - future we will get items per boardId
  var collection = db.get('clipboard');
  collection.find({}, {sort:{timestamp:-1}}, function(e, alldocs) {
  	var data = alldocs;
  	log.info('returning: ' + JSON.stringify(data));
  	if (data != null) { res.json(data); }
  	else { res.json(""); }
  });
});

// create a new item within a board
router.post(API_PREFIX+'/boards/:boardId/items/', function(req, res, next) {
  log.info('POST /boards/' + req.params.boardId + '/items');
  // FUTURE: middleware to check auth on board to ensure user has access to add
  var pasteData = req.body.raw;
  var stampit = moment().valueOf();
  if (pasteData == null || pasteData.length <= 0) { res.status(400).send("It is you, not me"); return;}
  var db = req.db;
  // FUTURE: for we only support a single global board - future we will get items per boardId
  var collection = db.get('clipboard');
  collection.insert({'timestamp': stampit,'raw' : pasteData}, function (err, doc) {
    if (err) { res.status(400).send("There was a problem adding the information to the database."); }
    else { res.json("{success: true}"); }
  });
});

// delete a board item
router.delete(API_PREFIX+'/boards/:boardId/items/:itemId', function(req, res, next) {
  log.info('DELETE /boards/' + req.params.boardId + '/items/' + req.params.itemId);
  // FUTURE: middleware to check auth if user has access to delete items in this board
  var db = req.db;
  // FUTURE: for we only support a single global board - future we will delete items per boardId
  var collection = db.get('clipboard');
  collection.remove({_id: req.params.itemId}, {safe: true}, function(err, result) {
    if (err) { log.info("err:"+err); res.status(400).send("There was a problem removing the information from the database."); }
    else { res.json("{success: true}"); }
  });
});


// -- API -- 

// get info about the api
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