import * as register from './register-user'
import * as authenticate from './authenticate-user'

export const UserController = {
  ...register,
  ...authenticate,
}
