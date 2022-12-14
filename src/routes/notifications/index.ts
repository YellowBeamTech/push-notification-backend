import { Router } from 'express'
import { validateRequest } from '../../common/validations/validateRequest';
import { deviceRegisterValidations, pushNotificationValidations } from '../../utils/validation_fields';
import { NotificationController } from '../../controller/NotificationControllers';

const notificationRouter = Router()
const notificationController = new NotificationController();

notificationRouter.route('/').get(validateRequest,notificationController.all)
notificationRouter.route('/:id').get(validateRequest,notificationController.one)
notificationRouter.route('/:id').delete(validateRequest,notificationController.remove)
notificationRouter.route('/:id').patch(validateRequest,deviceRegisterValidations, notificationController.registrationToken)
notificationRouter.route('/').post(validateRequest,pushNotificationValidations, notificationController.sendNotification)




export = notificationRouter
