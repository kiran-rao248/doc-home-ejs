var express = require('express');
var router = express.Router();
const lib = require('../config/library'); 

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { 
    title: 'Express',
    lang: lib.en,
    url: lib.url
   });
});

//get homepage in malay
router.get('/bm', function(req, res, next) {  
  res.render('index', { 
    title: 'Express',
    lang: lib.bm,
    url: lib.url
   });
});

module.exports = router;
