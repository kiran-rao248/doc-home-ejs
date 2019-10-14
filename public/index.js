/*Table of content
1.0 Declaring all variables
2.0 Create connection to database
3.0 Get data from MySQL
4.0 Get Login page
5.0 Logic for Login page */

/*1.0 Declare all necessary var */
const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const mysql = require('mysql');  

/*2.0 Create connection to db */ 
const db = mysql.createConnection ({  
    host: 'database-1.cxuvak9fdoln.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin.12345',
    database: 'usernamedevdb',
    port: 3306
});

//console log out to check conection from db
db.connect((err) => {
    if (err) {
        throw err;                          
    }
    console.log('Connected to database');
});
global.db = db;  
    
/*3.0 Get data from MySQL */
router.get('/caring-search/price', function(req, res , next){ 
 
    var obj = {}; 

    db.query("SELECT stk.outletid, stk.stkid, stk.lvl, stk.ohqty, pri.stkname, pri.rsp, pri.sp3, pri.stkdept, stk.mdate FROM stklocqty as stk  LEFT JOIN price_list as pri ON stk.stkid = pri.stkid;", function(err, result) {

        if(err){
            throw err;
        } else {
            fs.writeFile('public/json/caring.json' , JSON.stringify(result), function(err){ //write data in json file
                if (err){
                    throw err;
                } else{
                    console.log('JSON exported'); //console log out to check json is exported
                    obj = {print: result};
                    res.render('index', obj); 
                }

            })
               
        }
    }); 
});    

/*4.0 Get Login page */
router.get('/', function(req, res) { 
    res.render('login.ejs');
});


/*5.0 Logic for Login page */
router.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				response.redirect('/price');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}); 

module.exports = router; 