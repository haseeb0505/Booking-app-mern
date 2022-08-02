const User = require('../model/User');
const { createError } = require("../utils/error")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const register = async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    try {
        const newUser = new User({
            ...req.body,
            password: hash

        });
        await newUser.save();
        res.status(201).json({ message: 'User created!' });

    } catch (error) {
        next(error);
    }

}

const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return next(createError(404, 'User not found'))
        } else {
            const match = await bcrypt.compare(req.body.password, user.password)
            if (match) {
                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' })
                const { password, isAdmin, ...info } = user._doc
                res.cookie("access_token", token, {
                    httpOnly: true
                }).status(200).json({ details: { ...info }, isAdmin })
            } else {
                return next(createError(404, 'Password is incorrect.'))
            }
        }
    } catch (error) {
        next(error);
    }

}

module.exports = { register, Login }