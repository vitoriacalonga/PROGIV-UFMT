import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { ContentsService } from './contents.service';

describe('ContentsService', () => {
  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  let service: ContentsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        ContentsService,
        { provide: getRepositoryToken(Content), useValue: repository },
      ],
    }).compile();
    service = module.get(ContentsService);
  });

  it('cria um conteúdo com os textos normalizados', async () => {
    const dto = { title: '  Ladybug  ', text: '  Texto de exemplo  ', image: ' https://site.com/a.jpg ', displayOrder: 2 };
    const normalized = { title: 'Ladybug', text: 'Texto de exemplo', image: 'https://site.com/a.jpg', displayOrder: 2 };
    repository.create.mockReturnValue(normalized);
    repository.save.mockResolvedValue({ id: 1, ...normalized });

    await expect(service.create(dto)).resolves.toEqual({ id: 1, ...normalized });
    expect(repository.create).toHaveBeenCalledWith(normalized);
  });

  it('lista conteúdos por ordem de apresentação e id', async () => {
    repository.find.mockResolvedValue([]);
    await service.findAll();
    expect(repository.find).toHaveBeenCalledWith({ order: { displayOrder: 'ASC', id: 'ASC' } });
  });

  it('lança NotFoundException quando o id não existe', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('atualiza um conteúdo existente', async () => {
    const current = { id: 1, title: 'Antigo', text: 'Texto de exemplo', image: 'https://site.com/a.jpg', displayOrder: 1 };
    repository.findOne.mockResolvedValue(current);
    repository.save.mockImplementation(async (value: Content) => value);
    await expect(service.update(1, { title: '  Novo  ' })).resolves.toMatchObject({ title: 'Novo' });
  });

  it('remove um conteúdo existente', async () => {
    const content = { id: 1 };
    repository.findOne.mockResolvedValue(content);
    repository.remove.mockResolvedValue(content);
    await expect(service.remove(1)).resolves.toEqual({ message: 'Conteúdo excluído com sucesso.' });
    expect(repository.remove).toHaveBeenCalledWith(content);
  });
});
