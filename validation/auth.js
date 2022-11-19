import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('avatarUrl').optional().isURL()
]