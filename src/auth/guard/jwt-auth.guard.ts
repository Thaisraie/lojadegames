import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Validação do token. 
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}