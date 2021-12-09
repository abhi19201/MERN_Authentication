const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(cors({ credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Config
dotenv.config();

//database
const mongoDb = require("./server/database/mongoConnection");
mongoDb.connectMongo();

//session
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: mongoDb.store,
    })
);

//Routes
const List = require("./server/routes/listRouter");
app.use("/list", List);

//save current user
const UserModel = require("./server/models/userSchema");

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    UserModel.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

const User = require("./server/routes/authRouter");
app.use(User);


app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
}

server = app.listen(process.env.PORT, () => {
    console.log(`Server Running at http://localhost:${process.env.PORT}`);
});
