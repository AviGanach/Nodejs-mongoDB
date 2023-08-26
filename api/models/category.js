const mongoose = require('mongoose');

// Check that indeed the fields we defined as unique will be unique before saving in the database.
// const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    title: { type: String, required: true },

    description: { type: String, required: true },
});

// Add our checker from line 4 to the schema
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);