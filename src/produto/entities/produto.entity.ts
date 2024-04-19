import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_produtos"})
export class Produto {
    
    @PrimaryGeneratedColumn() 
    id: number;

    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    nome: string;

    @Column({type: "decimal", precision: 10, scale: 2})
    preco: number;

    @Column()
    foto: string;
}