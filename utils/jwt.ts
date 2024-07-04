import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

export function signJwtToken(
  payload: object,
  options: SignOptions = {}
): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  const token = jwt.sign(payload, secret, options);
  return token;
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
