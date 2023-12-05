const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ...

// Register
router.post('/register', async (req, res) => {
    const { email, password, role, firstname, lastname, isActive, avatar } = req.body;

    try {
        // Utilisation de findOne pour vérifier si l'utilisateur existe déjà
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).send({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hash,
            role: role || "user",
            firstname: firstname || "myfirstname",
            lastname: lastname || "mylastname",
            isActive: isActive || true,
            avatar: avatar || "avatar.jpg"
        });

        await newUser.save();
        return res.status(201).send({ success: true, message: "Account created successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ...

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ success: false, message: "Account doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        if (!user.isActive) {
            return res.status(200).send({ success: false, message: 'Your account is inactive, Please contact your administrator' });
        }

        const token = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).send({ success: true, user, token, refreshToken });

    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});

// ...

// Token refresh
router.post('/refreshToken', async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).send({ success: false, message: 'Token Not Found' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).send({ success: false, message: 'Unauthorized' });
            }

            const token = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            res.status(200).send({ success: true, token, refreshToken: newRefreshToken });
        });

    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});

// ...

// Enable/Disable User Account by Admin
router.put('/status/edit', async (req, res) => {
    try {
        const { idUser } = req.body;
        const user = await User.findById(idUser).select('+isActive');

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).send({ success: true, user });

    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});

// ...

module.exports = router;
