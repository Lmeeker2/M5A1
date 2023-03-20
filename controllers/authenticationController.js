const User = require ('/Users/owner/Desktop/M5A1/models/User');
const bycrpt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).render('signup', { pageTitle: 'Sign Up Form'});
}

exports.signup = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Create a user
    const { name, email, password, confirmPassword } = req.body; 
    try {
        User.create({
            name: test,
            password: 2023,
            email: test,
            confirmPassword: 2023

        }).then(user => res.json(user));
    } catch (error) {
        console.log(error);
        const errors = validationResult(req);
        const errorDetails = [
            {
                "location": "Authorization",
                "msg": `${name} ${error}`,
                "param": name
            }
        ];
        res.json({errors: errorDetails});
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: 'User does not exist'});
    }
    //compare passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    //login
    try {
        let token = await req.user.generateAuthToken();
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 258920000000000),
            httpOnly: true
        });
        res.status(200).json({ message: 'User login' });
    } catch (error) {
        console.log(error);
    }
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token !== req.token;
        });
        res.clearCookie('jwtoken', { path: '/'});
        await req.user.save();
        res.status(200).send('User logout');
    } catch (error) {
        console.log(error);
    }
}