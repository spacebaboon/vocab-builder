// server.js

// set up ========================
var express = require('express');
var app = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://localhost/words');

app.configure(function () {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
});

// define model =================
var Word = mongoose.model('Word', {
    english: String,
    german: String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all words
app.get('/api/words', function (req, res) {

    // use mongoose to get all words in the database
    Word.find(function (err, words) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(words); // return all words in JSON format
    });
});

// create word and send back all words after creation
app.post('/api/words', function (req, res) {

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
app.delete('/api/words/:word_id', function (req, res) {
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
app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(9090);
console.log("App listening on port 9090");


