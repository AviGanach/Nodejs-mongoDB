const mongoose = require('mongoose');

// Check that indeed the fields we defined as unique will be unique before saving in the database.
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    email: { type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },

    password: { type: String, required: true },
    
});

// Add our checker from line 4 to the schema
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);