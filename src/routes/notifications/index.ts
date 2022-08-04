import { Router } from 'express'
import { validateRequest } from '../../common/validations/validateRequest';
import { deviceRegisterValidations } from '../../utils/validation_fields';
import { NotificationController } from '../../controller/NotificationControllers';

const notificationRouter = Router()
const notificationController = new NotificationController();
console.log('*******2***********')

notificationRouter.route('/:id').patch(validateRequest,deviceRegisterValidations, notificationController.registrationToken)


export = notificationRouter
