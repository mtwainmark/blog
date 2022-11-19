import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { registerValidation } from './validation/auth.js'
import { validationResult } from "express-validator";
import UserModel from './models/User.js';

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('Connect'))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json(erros.array());
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash,
    });

    const user = await doc.save();

    return res.json({
        success: true,
        user
    })
})

app.listen(9000, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log('Server OK');
});