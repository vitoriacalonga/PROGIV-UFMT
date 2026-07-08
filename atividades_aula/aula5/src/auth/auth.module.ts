import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; 
import { PessoaModule } from '../pessoa/pessoa.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PessoaModule,
    PassportModule,
    JwtModule.register({
      secret: 'minha_chave_super_secreta_ufmt', 
      signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}