const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "You didn't specify a username"],
    },
    password: {
        type: String,
        required: [true, "You didn't specify a password"],
    },
    firstName: {
        type: String,
        required: [true, "You didn't specify a first name"],
    },
    lastName: {
        type: String,
        required: [true, "You didn't specify a last name"],
    },
    nickName: {
        type: String,
        required: [true, "You didn't specify a nick name"],
    },
    date: {
        type: Date,
        required: [true, "You didn't specify a date"],
    },
    itemsList: [
        {
            enteredText: {
                type: String,
                required: [true, "You didn't specify a password"],
            },
        },
    ],
});

module.exports = mongoose.model("havilists", userSchema);
