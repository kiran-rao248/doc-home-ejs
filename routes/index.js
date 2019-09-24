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

// USE THIS AFTER HAVE BUTTON BM/EN
// router.get('/', function(req, res, next) {
//   var lang = "en"  
//   if (req.query.lang == "bm") {
//     lang = "bm"}
//      res.render('index', { 
//     title: 'Express',
//     lang: lib[lang],
//     url: lib.url
//    });
// });

module.exports = router;