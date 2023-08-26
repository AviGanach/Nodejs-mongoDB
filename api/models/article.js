const mongoose = require('mongoose');

// Check that indeed the fields we defined as unique will be unique before saving in the database.
// const uniqueValidator = require('mongoose-unique-validator');

const articleSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    title: { type: String, required: true },

    description: { type: String, required: true },

    content: { type: String, required: true },

    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category'},
    image: { type: String },
});

// Add our checker from line 4 to the schema
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Article", articleSchema);