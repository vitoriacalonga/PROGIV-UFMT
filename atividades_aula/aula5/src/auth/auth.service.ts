import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PessoaService } from '../pessoa/pessoa.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private pessoaService: PessoaService,
    private jwtService: JwtService
  ) {}

  async login(id: number, senhaPura: string) {
    const pessoa = await this.pessoaService.findOne(id);
    
    if (pessoa && await bcrypt.compare(senhaPura, pessoa.senha)) {
      const payload = { sub: pessoa.id, nome: pessoa.nome }; 
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }
}