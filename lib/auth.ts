import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');
const alg = 'HS256';

export async function createToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(username: string, password: string) {
  // In a real app, validate against a database
  if (username === 'admin' && password === 'admin123') {
    return createToken({ username });
  }
  return null;
}