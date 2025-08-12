import { makeUser } from 'test/factories/makeUser';
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { GetProfileUserUseCase } from './get-profile-user-use-case';

let inMemoryUserRepository: InMemoryUserRepository;
let getUserProfileUseCase: GetProfileUserUseCase;

describe('Get Profile User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserProfileUseCase = new GetProfileUserUseCase(inMemoryUserRepository);
  });

  it('Should be able to get user profile', async () => {
    const user = makeUser();

    inMemoryUserRepository.items.push(user);

    const { email, username } = await getUserProfileUseCase.execute({
      userId: user.id.toString(),
    });

    expect(email).toEqual(user.email);
    expect(username).toEqual(user.username);
  });
  it('Should not be able to get profile if user not exists', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'not-exists-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
