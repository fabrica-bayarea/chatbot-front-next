import jwt from 'jsonwebtoken';

import type { User } from './definitions';

const secret = process.env.JWT_SECRET_KEY as jwt.Secret;

export function createToken(user: User): string {
  return jwt.sign(user, secret);
}

export function verifyToken(token: string): User {
  return jwt.verify(token, secret) as User;
}
