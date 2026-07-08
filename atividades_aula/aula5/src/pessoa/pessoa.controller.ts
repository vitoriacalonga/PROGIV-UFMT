import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  // O POST fica aberto para podermos criar novos cadastros
  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto);
  }

  // O GET fica protegido pela estratégia JWT
  @UseGuards(AuthGuard('jwt')) 
  @Get()
  findAll() {
    return this.pessoaService.findAll();
  }

  // Protegendo a busca por ID
  @UseGuards(AuthGuard('jwt')) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  // Protegendo a exclusão
  @UseGuards(AuthGuard('jwt')) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}