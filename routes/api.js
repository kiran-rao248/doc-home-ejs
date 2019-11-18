//1. Configure express application 
const express = require('express');
const router = express.Router();
const appURI = 'http://localhost:3000'; 
const algoliasearch = require('algoliasearch');
const config = require('../config/config');
var client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
var index = client.initIndex('shopify_prodproducts');

router.post('/search/pagination', function(req, res, next){
    let payload = req.body;
    let algoliaPayload = {
        query : payload.handle,
        attributesToHighlight : [],
        hitsPerPage : 10,
        page: payload.page
    }
    
    if(payload.attributes){
        algoliaPayload.attributesToRetrieve = payload.attributes;

    }

    index.search(algoliaPayload, function(err, content){
        console.log(content)
        res.send(content)
        
    });
});

module.exports = router;