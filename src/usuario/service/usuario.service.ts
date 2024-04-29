import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt // Classe recurso auth para injetado para criptografar a senha.
    ) { }


    // Método procura no banco de dados pelo e-mail checa se o e-mail existe ou não e retorna para o usuário, método usado apenas na classe security. 
    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find(
            {
                relations:{
                    produto: true
                }
            }
        );

    }

    async findById(id: number): Promise<Usuario> {

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    // Método com condição que checa se o usuário já existe para não haver duplicidade na autenticação. 
    async create(usuario: Usuario): Promise<Usuario> {
        
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (!buscaUsuario) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);

    }

    // Método busca o id e e-mail se é da mesma pessoa para atualizar, se o ID for diferente ele entende que o usuário está usando o email de outra pessoa, para não duplicar o produto no banco de dados.
    async update(usuario: Usuario): Promise<Usuario> {

        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (!updateUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }
    // Não é implementado o delete para os usuários não apagar outros usuários.
}