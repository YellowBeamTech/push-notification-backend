import { Router } from 'express'
const apiRouter = Router()
apiRouter.use('/users', require('./users'))
apiRouter.use('/package', require('./package'))
apiRouter.use('/notifications', require('./notifications'))
apiRouter.use('/payment', require('./payment'))

export = apiRouter

