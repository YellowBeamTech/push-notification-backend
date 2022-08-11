import { PackageController } from '../../controller/PackageController';
import { Router } from 'express'
import { validateRequest } from '../../common/validations/validateRequest';
import { createPackageValidations, forgotPasswordValidations, resetPasswordValidations, signinValidations, signupValidations, updatePackageValidations, updateUserValidations } from '../../utils/validation_fields';

const packageRouter = Router()
const packageController = new PackageController;

packageRouter.route('/').get(validateRequest,packageController.all)
packageRouter.route('/:id').get(validateRequest,packageController.one)
packageRouter.route('/:id').delete(validateRequest,packageController.remove)
packageRouter.route('/:id').put(validateRequest,updatePackageValidations, packageController.update)
packageRouter.route('/').post(validateRequest, createPackageValidations,packageController.save)


export = packageRouter
