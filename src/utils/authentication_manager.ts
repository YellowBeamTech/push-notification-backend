import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nextTick } from "process";
import { UserTokenData } from "../interface/User";
import * as crypto from 'crypto'


/**
 * Returns a hashed password
 * @param password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * Compares a hashed and unhashed password
 * @param hashedPassword
 * @param unhashedPassword
 */
export const comparePassword = async (hashedPassword: string, unhashedPassword: string): Promise<boolean> => {
  return bcrypt.compareSync(unhashedPassword, hashedPassword);
}

/**
 * Generates a JWT for a user
 * @param userId
 * @param isAdmin
 */
export const generateUserJWT = async (userId: string, user_email: string, isAdmin: boolean): Promise<string> => {
  return jwt.sign({ user_id: userId, email: user_email, is_admin: isAdmin }, process.env.JWT_SECRET || 'secret');
}

/**
 * Verifies a JWT token
 * @param token
 */
export const verifyJWT = async (token: string): Promise<UserTokenData> => {
  try {
     const result = jwt.verify(token, process.env.JWT_SECRET || 'secret');
     return result as UserTokenData
  } catch (error) {
    return undefined;
  }

}

export const genCryptoHash = async (bytes: string): Promise<string> => {
  return await crypto
    .createHash('sha256')
    .update(bytes)
    .digest()
    .toString('hex')
}
