export interface JwtPayloadDto {
  sub: string;           // user.Id
  email: string;         // user.Email
  role: 'Admin' | 'User';          // user.Roll?.Name ili "User"
  ver: string;           // user.TokenVersion
  iat: number;           // issued at
  exp: number;           // expiration (iz JWT)
  aud: string;           // audience
  iss: string;           // issuer
  jti: string;           // unique token id
}
