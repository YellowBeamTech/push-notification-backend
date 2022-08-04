import { body } from "express-validator";



export const updateUserValidations = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('first_name not provided'),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('last_name not provided'),
  body('email')
    .isEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email provided'),

]

export const signupValidations = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('first_name not provided'),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('last_name not provided'),
  body('email')
    .isEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email provided'),
  // body('phone_no').optional({ nullable: false }).matches(/^[\+]?[(]?[0-9]{3,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,7}$/im).withMessage('mobile_number not vaild'),

]

export const signinValidations = [
  body('password')
    .not()
    .isEmpty()
    .withMessage('password not provided'),
  body('email')
    .isEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email provided'),
  // body('phone_no').optional({ nullable: false }).matches(/^[\+]?[(]?[0-9]{3,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,7}$/im).withMessage('mobile_number not vaild'),

]


export const deviceRegisterValidations = [
  body('deviceToken')
    .not()
    .isEmpty()
    .withMessage('please provide device registration token')
]