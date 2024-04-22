import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_produtos"})
export class Produto {
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    nome: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({type: "decimal", precision: 10, scale: 2})
    preco: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column()
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE" 
    })
    categoria: Categoria;
}