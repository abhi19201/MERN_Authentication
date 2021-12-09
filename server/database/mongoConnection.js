const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

exports.connectMongo = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(
                `Mongo Connected Successfully with : ${data.connection.host}`
            );
        })
        .catch((err) => {
            console.log(err);
        });
};

//session store
exports.store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
});
