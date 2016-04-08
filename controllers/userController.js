var 
express = require("express"),
router = express.Router(),
Bcrypt = require('bcrypt'),
SALT = 10;

var User = require("../models/user");

router.get("/all", function(req, res, next) {
	// body...
	User.find({})
		.exec(function (err, results) {
			res.json(results);
		});
});

/*
** POST
** Try user login
*/
router.post("/login", function (req, res) {
	User.findOne({
		email: req.body.email
	})
	.exec(function (err, user) {
		Bcrypt.hash(req.body.password, SALT, function(err, hash) {
	        if(err) { 
	        	res.send('error to hash the password - ' + err);
	        } else {
	        	Bcrypt.compare(user.password, hash, function(err, isMatch) {
                        if(err) {
                        	res.send('wrong credentials.');
                        } else {
                        	res.json(user);
                        }
                });
		    }
		});
	});
});

/*
** POST
** Insert a user
*/
router.post("/", function (req, res) {
	console.log(req.body);
	var newUser = new User();
	newUser.username = req.body.username;
	newUser.email = req.body.email;

	Bcrypt.hash(req.body.password, SALT, function(err, hash) {
        if(err) { res.send('error at creating new user - password - ' + err);}
        else{
	        newUser.password = hash;
	        newUser.save(function (err, user) {
	        	if(err) { 
	        		res.send('error at creating new user - save user - ' + err);
	        	} else {
	        		res.json(user);
	        	}
	        });
    	}
	});
});

module.exports = router;