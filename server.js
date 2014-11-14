'use strict';
// server.js

// set up ========================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// configuration =================

var app = express();

mongoose.connect('mongodb://localhost/words');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users

var router = express.Router();

// define model =================
var Word = mongoose.model('Word', {
    english: String,
    german: String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all words
router.get('/api/words', function (req, res) {

    // use mongoose to get all words in the database
    Word.find(function (err, words) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(words); // return all words in JSON format
    });
});

// create word and send back all words after creation
router.post('/api/words', function (req, res) {

    // create a word, information comes from AJAX request from Angular
    Word.create({
        english: req.body.english,
        german: req.body.german,
        done: false
    }, function (err, word) {
        if (err)
            res.send(err);

        // get and return all the words after you create another
        Word.find(function (err, words) {
            if (err)
                res.send(err);
            res.json(words);
        });
    });

});

// delete a word
router.delete('/api/words/:word_id', function (req, res) {
    Word.remove({
        _id: req.params.word_id
    }, function (err, word) {
        if (err)
            res.send(err);

        // get and return all the words after you create another
        Word.find(function (err, words) {
            if (err)
                res.send(err);
            res.json(words);
        });
    });
});


// application -------------------------------------------------------------
router.get('*', function (req, res) {
    res.sendFile('public/index.html', {root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
});

app.use('/', router);
app.listen(9090);
console.log("App listening on port 9090");


