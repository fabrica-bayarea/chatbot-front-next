import jwt, { type Secret } from 'jsonwebtoken';

import type { UserType } from '@/types';

const secret = process.env.JWT_SECRET_KEY as Secret;

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}

export function createToken(user: UserType) {
  return jwt.sign(user, secret);
}
