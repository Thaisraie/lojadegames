import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entities";
import { ILike, Repository } from "typeorm";

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

    async findById(id: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where:{
                id
            }
        });

        if (!categoria)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findByTipo(tipo: string): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where:{
                tipo: ILike(`%${tipo}%`) 
            }
        })
    }
}