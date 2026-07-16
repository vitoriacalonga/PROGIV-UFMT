import { Test } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

describe('ContentsController', () => {
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  let controller: ContentsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [{ provide: ContentsService, useValue: service }],
    }).compile();
    controller = module.get(ContentsController);
  });

  it('encaminha POST para criação', () => {
    const dto = { title: 'Título', text: 'Texto de teste', image: 'https://site.com/a.jpg', displayOrder: 1 };
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('encaminha GET para listagem', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('encaminha GET por id', () => {
    controller.findOne(3);
    expect(service.findOne).toHaveBeenCalledWith(3);
  });

  it('encaminha PATCH para atualização', () => {
    controller.update(3, { title: 'Novo título' });
    expect(service.update).toHaveBeenCalledWith(3, { title: 'Novo título' });
  });

  it('encaminha DELETE para exclusão', () => {
    controller.remove(3);
    expect(service.remove).toHaveBeenCalledWith(3);
  });
});
