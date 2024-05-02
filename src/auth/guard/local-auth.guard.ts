import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Classe que herda o conteúdo auth guard passando a autentificação local, será usada no decorator para proteção da controladora.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}