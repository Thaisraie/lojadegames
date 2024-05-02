import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "src/produto/entities/produto.entities"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    public id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    public nome: string

    @IsEmail() // Decorador para o usuário digitar o e-mail.
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    public usuario: string

    @MinLength(8) // Decorador para inserir no mínimo 8 caracteries.
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    public senha: string

    @Column({length: 5000 }) 
    public foto: string

    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[]

}