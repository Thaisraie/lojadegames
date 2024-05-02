import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entities';
import { Produto } from './produto/entities/produto.entities';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojadegames',
      entities: [Categoria, Produto, Usuario], // Gera tabela no banco de dados.
      synchronize: true,
      logging: true, 
    }),
    CategoriaModule, ProdutoModule, AuthModule, UsuarioModule // Registrar a classe para o nest reconhecer os módulos.
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
