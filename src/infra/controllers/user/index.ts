import * as register from './register-user-controller'
import * as authenticate from './authenticate-user'

export const UserController = {
  ...register,
  ...authenticate,
}
