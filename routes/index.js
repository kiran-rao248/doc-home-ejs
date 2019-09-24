var express = require('express');
var router = express.Router();
const lib = require('../config/library');  

// USE THIS AFTER HAVE BUTTON BM/EN
router.get('/', function(req, res, next) {
  var lang = "en"  
  if (req.query.lang == "bm") {
    lang = "bm"
  }
     res.render('index', { 
    title: 'Express',
    language: lang,
    lang: lib[lang],
    url: lib.url
   });
});

module.exports = router;