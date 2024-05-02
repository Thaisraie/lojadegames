import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';

//  Classe que implementa o endpoint de autenticação (login) faz parte do recurso do usuário.
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    // Método de autenticação a partir dele faz o login. 
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UsuarioLogin): Promise<any> {
        return this.authService.login(user);
    }
}