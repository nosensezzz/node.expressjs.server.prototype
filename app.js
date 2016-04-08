/*
**
** Environment configuration
*/ 
var 
express = require('express'),
app = express(),
mongoose = require('mongoose'),
db = mongoose.connect('mongodb://localhost/dotability'),
bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var 
port = 10086;

/*
**
** univeral configurations
*/
app.get('/', function (req, res) {
  res.send('Hello World!!');
});

/*
**
** Modules register here
*/ 
var UserController = require("./controllers/userController");
app.use("/user", UserController);

/*
**
** Server start here
*/
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});