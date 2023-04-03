export interface JsonWebToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  createdAt: number;
}
