/**
 * Extending the Express Request interface to include a `user` property.
 * 
 * This augmentation adds a `user` field of type `JwtPayload` to the Express Request object.
 * It allows middleware and route handlers to access the authenticated user's decoded JWT payload.
 * 
 * `JwtPayload` typically includes:
 * - `sub`: The subject (user identifier).
 * - `iat`: Issued at timestamp.
 * - `exp`: Expiration timestamp.
 * - Other custom claims added during token creation.
 */

import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}
