import { Delete, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService{
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    produtoRepository: any;
    constructor(
        @InjectRepository(Produto)
        private categoriaRepository: Repository<Produto>
    ){}

    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find(); 
    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where:{
                id
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]>{
        return await this.produtoRepository.Find({
            where:{
                nome: ILike(`%${nome}%`) 
            }
        })
    }

    async create(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{

        let buscaProduto: Produto = await this.findById(produto.id);

            if (!buscaProduto || !produto.id)
                throw new HttpException('O Produto não foi encontrado!', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.save(produto);
    }

    async Delete(id: number): Promise<DeleteResult>{

        let buscaProduto: Produto = await this.findById(id);

            if (!buscaProduto) 
                throw new HttpException('O Produto não foi encontrado!', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.delete(id); 
        }
}