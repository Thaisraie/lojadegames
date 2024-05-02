import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


@Injectable()
export class AuthService{
    constructor( // Objeto sendo injeção de dependência: Acesso aos dados do usuário.
        private usuarioService: UsuarioService,
        private jwtService: JwtService, // Classe resp por gerar o token.
        private bcrypt: Bcrypt // Validar a senha.
    ){ }

    // Validação do usuário.
    async validateUser(username: string, password: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(buscaUsuario.senha, password)

        // Desestruturação quebrando o objeto. Variável recebe todos os elementos do objeto exceto a senha.
        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario 
            return resposta
        }

        return null

    }

    // Método busca resultado do usuário se encontrar retorna as informações do usuário.
    async login(usuarioLogin: UsuarioLogin){

        // Usuário que a pessoa digitou para fazer o login.
        const payload = { sub: usuarioLogin.usuario }

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario); 

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}