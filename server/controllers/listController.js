const User = require("../models/userSchema");
const mongoose = require("mongoose");

exports.addItem = (req, res, next) => {
    const email = req.body.email;
    const text = req.body.text;

    User.findOneAndUpdate(
        { email: email },
        { $push: { itemsList: { enteredText: text } } }
    )
        .then((user) => {
            return res.status(200).json({
                success: true,
                type: "success",
                message: "Item added Successfully.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getAllItems = (req, res, next) => {
    const email = req.query.email;

    if (email === 'admin') {
        User.find()
            .then((data) => {
                return res.status(200).json({
                    success: true,
                    type: "success",
                    message: "Items fetched Successfully.",
                    users: data,
                });
            })
            .catch((err) => {
                console.log(err);
            });;
    } else {
        User.findOne({ email: email })
            .then((user) => {
                return res.status(200).json({
                    success: true,
                    type: "success",
                    message: "Items fetched Successfully.",
                    itemsList: user.itemsList,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
};

exports.updateItem = (req, res, next) => {
    const email = req.body.email;
    const id = new mongoose.Types.ObjectId(req.body.id);
    const text = req.body.text;

    User.findOneAndUpdate(
        { email: email, "itemsList._id": id },
        { $set: { "itemsList.$.enteredText": text } }
    )
        .then((user) => {
            return res.status(200).json({
                success: true,
                type: "success",
                message: "Items updated Successfully.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteItem = (req, res, next) => {
    const email = req.body.email;
    const id = new mongoose.Types.ObjectId(req.body.id);

    User.findOneAndUpdate(
        { email: email },
        { $pull: { itemsList: { _id: id } } }
    )
        .then((user) => {
            return res.status(200).json({
                success: true,
                type: "success",
                message: "Item deleted Successfully.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
