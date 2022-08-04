import { UserController } from '../../controller/UserController';
import { Router } from 'express'
import { validateRequest } from '../../common/validations/validateRequest';
import { signinValidations, signupValidations, updateUserValidations } from '../../utils/validation_fields';

const userRouter = Router()
const userController = new UserController();

userRouter.route('/').get(validateRequest,userController.all)
userRouter.route('/:id').get(validateRequest,userController.one)
userRouter.route('/:id').delete(validateRequest,userController.remove)
userRouter.route('/:id').put(validateRequest,updateUserValidations, userController.update)
userRouter.route('/signup').post(signupValidations,userController.signup)
userRouter.route('/signin').post(signinValidations,userController.signin)

export = userRouter
