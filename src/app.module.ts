import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entities';
import { Produto } from './produto/entities/produto.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojadegames',
      entities: [Categoria, Produto],
      synchronize: true,
      logging: true, 
    }),
    CategoriaModule, ProdutoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
