import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Produto } from "src/produto/entities/produto.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_categoria"})
export class Categoria{

@PrimaryGeneratedColumn()
id: number;

@Transform(({ value }: TransformFnParams) => value?.trim())
@IsNotEmpty()
@Column({length: 100, nullable: false})
tipo: string;

@OneToMany(() => Produto, (produto) => produto.categoria)
produto: Produto[]

}