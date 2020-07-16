var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath('./config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET term of use
/* --------------------------------------  */
router.get('/haiti', function(req, res, next) {

    res.header('Content-Type', 'text/html');
    res.render('haiti.html', (err_term, html) => {
        if (!err_term) {
            res.send(html);
        } else {
            res.status(400).send('Ghaiti-HTML-Err-400');
        }
    });
});


module.exports = router;
