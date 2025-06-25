export interface IJwtData {
  sub: string
}
export interface IJWTService {
  sign(data: IJwtData): string
  verify(token: string): IJwtData
}
