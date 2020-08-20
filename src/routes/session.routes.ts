import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionouter = Router();

sessionouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, logged: true, token });
});

export default sessionouter;
