Account = require('../models/accountModel');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/registerValidator");
const validateLoginInput = require("../validation/loginValidator");
const validateUpdateProfileInput = require("../validation/updateProfileValidator");

exports.register = function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Account.findOne({ email: req.body.email }).then(account => {
        if (account) {
            return res.status(400).json({ email: "Email already exists" });
        }
        const newAccount = new Account({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAccount.password, salt, (err, hash) => {
                if (err) throw err;
                newAccount.password = hash;
                newAccount
                    .save()
                    .then(account => res.json(account))
                    .catch(err => console.log(err));
            });
        });
    });
};

exports.login = function (req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    Account.findOne({ email }).then(account => {
        // Check if account exists
        if (!account) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, account.password).then(isMatch => {
            if (isMatch) {
                // Account matched
                // Create JWT Payload
                const payload = {
                    id: account.id,
                    name: account.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
};


exports.updateProfile = function (req, res) {
    const { errors, isValid } = validateUpdateProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Account.findOne({ email: req.body.email }).then(account => {
        // Check if account exists
        if (!account) {
            return res.status(404).json({ emailnotfound: "Account not found" });
        }
        // Check password
        bcrypt.compare(req.body.currentPassword, account.password).then(isMatch => {
            if (isMatch) {
                account.name = req.body.name
                account.password = req.body.password
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(account.password, salt, (err, hash) => {
                        if (err) throw err;
                        account.password = hash;
                        account
                            .save()
                            .then(account => res.json(account))
                            .catch(err => console.log(err));
                    });
                });
            } else {
                return res
                    .status(400)
                    .json({ currentPassword: "Current password incorrect" });
            }
        });
    });
};