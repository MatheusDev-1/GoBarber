import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover its password using e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'matheus.mdahora@gmail.com',
    });

    await sendForgotPasswordEmail.execute({
      email: 'matheus.mdahora@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover its password from a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'matheus.mdahora@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'matheus.mdahora@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'matheus.mdahora@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
