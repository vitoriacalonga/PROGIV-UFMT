import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { Pessoa } from './entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]), PassportModule],
  controllers: [PessoaController],
  providers: [PessoaService],
  exports: [PessoaService],
})
export class PessoaModule {}