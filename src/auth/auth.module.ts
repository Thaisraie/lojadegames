import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions:{
        expiresIn: '1h' // Tempo que expira o token.
      }
    })
  ],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy], // Será utilizada em outras classes.
  controllers: [AuthController],
  exports: [Bcrypt], // Será utilizada em outros recursos para acessar. 
})
export class AuthModule { }