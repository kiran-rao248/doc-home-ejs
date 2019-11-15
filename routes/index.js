var express = require('express');
var router = express.Router();
const lib = require('../config/library');  
const request = require('request');
const apiURI = 'http://localhost:3000/api-v1';

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

//filter algolia search
router.post('/get/products/search', function(req, res, next) {
  let payload = req.body;
  console.log("body body" ,req.body)
  //define attributes needed
  payload.attributes = ["sku","title", "handle", "product_image", "variant_title", "price", "product_type"]
  let searchOptions = {
    method: 'post',
    url: apiURI + '/search/pagination',
    body: payload,
    json: true
  }
 
  request.post(searchOptions, function(err, httpResponse, body){
    
        //iterate search result
        var results = body 
        
        for(i=0; i<results.hits.length;i++){
          var skuStatus = false
          if(results.hits[i].sku){
            var p=results.hits[i].product_type;
            if(p!="corporate"&&(results.hits[i].sku).toLowerCase()!="nexus"){
              //hide sku id
              skuStatus = true
            }
          results.hits[i].sku = skuStatus         
        }
      }

    res.send(body);
  })

});

module.exports = router;