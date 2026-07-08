import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const salt = await bcrypt.genSalt(); // Adiciona aleatoriedade
    const hash = await bcrypt.hash(createPessoaDto.senha, salt);
    
    createPessoaDto.senha = hash; // Substitui a senha pura pelo hash
    return this.pessoaRepository.save(createPessoaDto); 
  }

  findAll() {
    return this.pessoaRepository.find();
  }

  findOne(id: number) {
    return this.pessoaRepository.findOneBy({ id: id });
  }

  remove(id: number) {
    return this.pessoaRepository.delete(id);
  }
}