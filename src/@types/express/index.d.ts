import 'express'

declare module 'express-serve-static-core' {
  export interface Request {
    userId?: string
  }
}
