import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entities";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_produtos"})
export class Produto {
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    nome: string;

    @IsNumber({maxDecimalPlaces: 2}) // Mostra duas casas decimais. 
    @Column({type: "decimal", precision: 10, scale: 2})
    preco: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column()
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE" 
    })
    categoria: Categoria;

    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE" 
    })
    usuario: Usuario;

    // Classe com duas chaves entrangeiras, categoria e usuário. 
}