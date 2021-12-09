const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");

exports.checkAuth = (req, res, next) => {
    const userSession = req.session.user;

    if (userSession) {
        return res.status(200).json({
            success: true,
            type: 'success',
            message: "Authenticated Successfully",
            email: userSession.email,
            nickName: userSession.nickName,
        });
    } else {
        return res.status(401).json({ msg: "Unauthorizedhai" });
    }

};



exports.userLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.json({
                    success: false,
                    type: "error",
                    message: "User Not Found",
                });
            }
            bcrypt
                .compare(password, user.password)
                .then((matched) => {
                    if (matched) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;

                        return res.status(200).json({
                            success: true,
                            type: "success",
                            message: "User Loggedin Successfully",
                            email: user.email,
                            nickName: user.nickName,
                        });
                    }

                    return res.json({
                        success: false,
                        type: "error",
                        message: "Invalid email or password.",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => console.log(err));
};

exports.userSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const nickName = req.body.nickName;
    const date = req.body.date;

    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                return res.json({
                    success: false,
                    type: "error",
                    message:
                        "User already exists on current E-Mail, please pick a different one",
                });
            } else {
                return bcrypt
                    .hash(password, 12)
                    .then((hashedPassword) => {
                        const user = new User({
                            email: email,
                            password: hashedPassword,
                            firstName: firstName,
                            lastName: lastName,
                            nickName: nickName,
                            date: date,
                            itemsList: [],
                        });
                        return user.save();
                    })
                    .then((result) => {
                        req.session.isLoggedIn = true;
                        req.session.user = result;

                        return res.status(200).json({
                            success: true,
                            type: "success",
                            message: "User created Successfully.",
                            email: result.email,
                            nickName: result.nickName,
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {

    req.session.destroy((err) => {
        if (err) throw err;

        res.clearCookie("session-id");

        return res.status(200).json({
            success: true,
            type: "success",
            message: "User Logged out Successfully.",
        });
    });
};
