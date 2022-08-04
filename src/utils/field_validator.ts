import { Request } from 'express'
import { validationResult, ErrorFormatter } from 'express-validator/src/validation-result'

export default function (req: Request): FieldValidator {
  const errors = validationResult(req).formatWith(formatErrors)
  if (!errors.isEmpty()) {
    return { isValid: false, errors: errors.array() }
  }
  return { isValid: true }
}

const formatErrors: ErrorFormatter = ({ location, param, msg }): any => {
  console.log('location', location)
  return { [`${param}`]: msg }
}

export interface FieldValidator {
  isValid: boolean
  errors?: any[]
}