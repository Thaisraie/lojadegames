import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entities";

@Controller("/categoria")
export class CategoriaController{
    
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

    @Get('/:id') 
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }

    @Get('/tipo/:tipo') 
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('tipo') titulo: string): Promise<Categoria[]>{
        return this.categoriaService.findByTipo('tipo');
    } 
}