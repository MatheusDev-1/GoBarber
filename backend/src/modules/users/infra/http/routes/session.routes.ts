import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionouter = Router();

sessionouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();

  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, logged: true, token });
});

export default sessionouter;
