import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

// Classe com processo de autenticação usando o passport.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ // Sobrescrevendo os atributos no construtor que valida o usuário.
      usernameField: 'usuario',
      passwordField: 'senha'
    });
  }

  // Método recebe usuário e senha e valida o método na classe de serviço. 
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}