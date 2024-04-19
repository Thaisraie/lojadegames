import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entities";
import { Repository } from "typeorm";

@Injectable()
export class CategoriaService{
    categoriaRepositoryRepository: any;
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria> 
    ){}

    async findAll(): Promise<Categoria[]>{
        return await this.categoriaRepositoryRepository.find(); 
    }
}