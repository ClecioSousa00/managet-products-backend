import { User, type UserProps } from '@/domain/enterprise/entities/user';
import { Email } from '@/domain/enterprise/value-objects/Email';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export const makeUser = (
  override: Partial<UserProps> = {},
  id?: UniqueEntityId
): User => {
  const user = User.create(
    {
      email: new Email('johndoe@gmail.com'),
      username: 'John Doe',
      password: '123456789',
      ...override,
    },
    id
  );

  return user;
};
