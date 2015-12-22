var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('clipboard');

  // get JUST the last 10 items from DB and pass into render
  // and make sure to fetch most recent first
  collection.find({}, {limit:10, sort:{timestamp:-1}}, function(e, alldocs) {
    res.render('index', { title: 'CandV', itemsSubSet: alldocs });
  });
});

/* GET Userlist page. */
router.get('/clipboard', function(req, res) {
  var db = req.db;
  var collection = db.get('clipboard');
  collection.find({}, {sort:{timestamp:-1}}, function(e, alldocs) {
    res.render('clipboard', {"clipboard" : alldocs});
  });
});

/* POST to add an item */
router.post('/paste', function(req, res) {
  var db = req.db;
  var pasteData = req.body.pastedata;
  if (pasteData.length < 1) { 
    console.log('ignoring zero length add');
    return; 
  } // no empty data
  var stampit = moment().valueOf();
  console.log(stampit + ' pasting: ' + pasteData);
  var collection = db.get('clipboard');
  collection.insert({
    'timestamp': stampit,
    'raw' : pasteData
    },
    function (err, doc) {
      if (err) { res.send("There was a problem adding the information to the database."); }
      else { res.redirect("/"); }
  });
});

module.exports = router;
