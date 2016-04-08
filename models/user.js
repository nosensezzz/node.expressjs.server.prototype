'use strict';

var 
mongoose = require("mongoose"),
Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	activate:{
		type: Boolean,
		default: false
	}


});

module.exports = mongoose.model('User', UserSchema);