import { UserController } from '../../controller/UserController';
import { Router } from 'express'
import { validateRequest } from '../../common/validations/validateRequest';
import { forgotPasswordValidations, resetPasswordValidations, signinValidations, signupValidations, updateUserValidations } from '../../utils/validation_fields';

const userRouter = Router()
const userController = new UserController();

userRouter.route('/update/:id').put(validateRequest,updateUserValidations, userController.update)
userRouter.route('/forgot_password').put(forgotPasswordValidations,userController.forgot_password)
userRouter.route('/').get(validateRequest,userController.all)
userRouter.route('/:id').get(validateRequest,userController.one)
userRouter.route('/:id').delete(validateRequest,userController.remove)
userRouter.route('/signup').post(signupValidations,userController.signup)
userRouter.route('/signin').post(signinValidations,userController.signin)
userRouter.route('/reset_password').post(resetPasswordValidations,userController.reset_password)

export = userRouter
