import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './content.entity';

@Injectable()
export class ContentsService {
  constructor(@InjectRepository(Content) private readonly repository: Repository<Content>) {}

  create(dto: CreateContentDto) {
    return this.repository.save(this.repository.create(this.normalize(dto)));
  }

  findAll() {
    return this.repository.find({ order: { displayOrder: 'ASC', id: 'ASC' } });
  }

  async findOne(id: number) {
    const content = await this.repository.findOne({ where: { id } });
    if (!content) throw new NotFoundException('Conteúdo não encontrado.');
    return content;
  }

  async update(id: number, dto: UpdateContentDto) {
    const content = await this.findOne(id);
    Object.assign(content, this.normalize(dto));
    return this.repository.save(content);
  }

  async remove(id: number) {
    const content = await this.findOne(id);
    await this.repository.remove(content);
    return { message: 'Conteúdo excluído com sucesso.' };
  }

  private normalize<T extends CreateContentDto | UpdateContentDto>(dto: T): T {
    return {
      ...dto,
      ...(dto.title !== undefined && { title: dto.title.trim() }),
      ...(dto.text !== undefined && { text: dto.text.trim() }),
      ...(dto.image !== undefined && { image: dto.image.trim() }),
    } as T;
  }
}
