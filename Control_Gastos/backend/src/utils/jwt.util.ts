import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { User } from '../models/user.model';

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn } as jwt.SignOptions);
};