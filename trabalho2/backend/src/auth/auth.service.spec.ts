import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('AuthService', () => {
  const queryBuilder = {
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
  };
  const repository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => queryBuilder),
  };
  const jwt = { signAsync: jest.fn().mockResolvedValue('token-jwt') };
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    queryBuilder.addSelect.mockReturnThis();
    queryBuilder.where.mockReturnThis();
    repository.createQueryBuilder.mockReturnValue(queryBuilder);
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: repository },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('impede cadastro com e-mail repetido', async () => {
    repository.findOne.mockResolvedValue({ id: 1 });
    await expect(service.register({ name: 'Vitória', email: 'vitoria@email.com', password: '123456' }))
      .rejects.toBeInstanceOf(ConflictException);
  });

  it('cadastra usuário com senha em hash e devolve JWT', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockImplementation((value) => value);
    repository.save.mockImplementation(async (value) => ({ id: 1, ...value }));

    const result = await service.register({ name: ' Vitória ', email: 'VITORIA@EMAIL.COM', password: '123456' });
    expect(result).toMatchObject({ accessToken: 'token-jwt', user: { id: 1, name: 'Vitória', email: 'vitoria@email.com' } });
    expect(repository.save.mock.calls[0][0].passwordHash).not.toBe('123456');
  });

  it('recusa login com senha inválida', async () => {
    queryBuilder.getOne.mockResolvedValue({ id: 1, passwordHash: await bcrypt.hash('correta', 4) });
    await expect(service.login({ email: 'vitoria@email.com', password: 'errada1' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
  });
});
