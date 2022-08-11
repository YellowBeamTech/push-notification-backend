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
]

export const forgotPasswordValidations = [
  body('email')
    .isEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email provided')
]
export const resetPasswordValidations = [
  body('password')
    .not()
    .isEmpty()
    .withMessage('password not provided')
]

export const deviceRegisterValidations = [
  body('deviceToken')
    .not()
    .isEmpty()
    .withMessage('please provide device registration token')
]

export const pushNotificationValidations = [
  body('description')
    .not()
    .isEmpty()
    .withMessage('please provide notification detail')
]

export const createPackageValidations = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('name not provided'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('description not provided'),
  body('no_of_notifications')
    .not()
    .isEmpty()
    .withMessage('no_of_notifications not provided'),
  body('expairy_time')
    .not()
    .isEmpty()
    .withMessage('expairy_time not provided'),
  body('price')
    .not()
    .isEmpty()
    .withMessage('price not provided'),
  body('currency')
    .not()
    .isEmpty()
    .withMessage('currency not provided'),
]
 
export const updatePackageValidations = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('name not provided'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('description not provided'),
  body('no_of_notifications')
    .not()
    .isEmpty()
    .withMessage('no_of_notifications not provided'),
  body('expairy_time')
    .not()
    .isEmpty()
    .withMessage('expairy_time not provided'),
  body('price')
    .not()
    .isEmpty()
    .withMessage('price not provided'),
  body('currency')
    .not()
    .isEmpty()
    .withMessage('currency not provided'),
]