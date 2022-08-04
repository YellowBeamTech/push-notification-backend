import { Router } from 'express'
console.log('*******1***********')
const apiRouter = Router()
apiRouter.use('/users', require('./users'))
apiRouter.use('/notifications', require('./notifications'))

export = apiRouter

