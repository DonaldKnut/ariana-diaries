import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

interface JwtPayloadExtended extends JwtPayload {
  // Extend this interface with any additional properties your payload might have
  [key: string]: any;
}

export function signJwtToken(
  payload: JwtPayloadExtended,
  options: SignOptions = {}
): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(payload, secret, options);
  return token;
}

export function verifyJwtToken(token: string): JwtPayloadExtended | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const payload = jwt.verify(token, secret) as JwtPayloadExtended;
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
