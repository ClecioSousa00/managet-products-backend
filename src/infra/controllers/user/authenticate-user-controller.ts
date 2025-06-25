import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error'
import { StatusCodes } from 'http-status-codes'

import { Controller, HttpRequest, HttpResponse } from '@/shared/controller'
import { AuthenticateUserBody } from '@/infra/http/validation/authenticate-validation-user'
import { JWTService } from '@/infra/auth/jwt'

type AuthenticateRequest = HttpRequest<AuthenticateUserBody>

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: AuthenticateRequest): Promise<HttpResponse> {
    const { email, password } = request.body
    try {
      const { id } = await this.authenticateUserUseCase.execute({
        email,
        password,
      })

      const payload = {
        sub: id,
      }

      const token = JWTService.sign(payload)

      return {
        status: StatusCodes.OK,
        body: {
          accessToken: token,
        },
      }
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        return {
          status: StatusCodes.UNAUTHORIZED,
          body: {
            message: error.message,
          },
        }
      }
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal server error' },
      }
    }
  }
}

// const authenticateBodySchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// })

// export const authenticateValidation = validateRequest(
//   'body',
//   authenticateBodySchema,
// )

// export async function AuthenticateUser(req: Request, res: Response) {
//   const { email, password } = authenticateBodySchema.parse(req.body)

//   try {
//     const userRepository = new UserPrismaRepository()
//     const authenticateUseCase = new AuthenticateUserUseCase(userRepository)

//     const { id } = await authenticateUseCase.execute({ email, password })

//     const payload = {
//       sub: id,
//     }

//     const token = JWTService.sign(payload)

//     res.status(StatusCodes.OK).json({ accessToken: token })
//   } catch (error) {
//     if (
//       error instanceof WrongCredentialsError ||
//       error instanceof InvalidTokenError
//     ) {
//       res.status(StatusCodes.UNAUTHORIZED).json({
//         message: error.message,
//       })
//     }
//   }
