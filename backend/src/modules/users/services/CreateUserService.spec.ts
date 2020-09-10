import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateAppointmentService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateAppointmentService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Matheus Oliveira da Hora',
      email: 'matheus.mdahora@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not able to create a new user with same e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateAppointmentService(fakeUsersRepository);

    await createUser.execute({
      name: 'Matheus Oliveira da Hora',
      email: 'matheus.mdahora@gmail.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Matheus Oliveira da Hora',
        email: 'matheus.mdahora@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
