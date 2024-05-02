import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';

// Classe pega o token e valida com a secret.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ignora ou não o tempo do token.
      secretOrKey: jwtConstants.secret,
    });
  }

  // Retorna o e-mail do usuário que o token pertence
  async validate(payload: any) {
    return { sub: payload.sub };
  }
}