import { Router } from 'express'
import { validateRequest } from '../../common/validations/validateRequest';
import { PaymentController } from '../../controller/Payment';
import { paymentValidations } from '../../utils/validation_fields';

const paymentRouter = Router()
const paymentController = new PaymentController;

paymentRouter.route('/').post(validateRequest, paymentValidations, paymentController.payment)
paymentRouter.route('/token').post(validateRequest, paymentController.createStripeToken)

export = paymentRouter
