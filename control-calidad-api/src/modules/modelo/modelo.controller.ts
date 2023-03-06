import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Modelo } from './modelo.entity';
import { ModeloService } from './modelo.service';

@Controller('modelo')
export class ModeloController {
    constructor(private readonly _modeloService: ModeloService){}

        @Get(':id')
        async getModelo(@Param('id',ParseIntPipe) id: number): Promise<Modelo>{
            const modelo = await this._modeloService.get(id);
            return modelo;
          
        }

        @Get()
        async getModelos(): Promise<Modelo[]>{
            const modelos: Modelo[] = await this._modeloService.getAll();
            return modelos;
        }

        @Post()
        async createModelo(@Body() modelo: Modelo): Promise<Modelo>{
           const createdModelo = await this._modeloService.create(modelo);
           return createdModelo;

        }

        @Patch(':id')
        async updateModelo(@Param('id',ParseIntPipe) id: number, @Body() modelo: Modelo){
           await this._modeloService.update(id, modelo);
            return true;
        }

        @Delete(':id')
        async deleteModelo(@Param('id',ParseIntPipe) id: number){
            await this._modeloService.delete(id);
            return true;
        }

}
