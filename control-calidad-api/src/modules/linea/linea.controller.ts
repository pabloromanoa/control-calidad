import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Linea } from './linea.entity';
import { LineaService } from './linea.service';

@Controller('linea')
export class LineaController {
    constructor(private readonly _lineaService: LineaService){}

        @Get(':id')
        async getLinea(@Param('id',ParseIntPipe) id: number): Promise<Linea>{
            const linea = await this._lineaService.get(id);
            return linea;
          
        }

        @Get()
        async getLineaes(): Promise<Linea[]>{
            const lineas: Linea[] = await this._lineaService.getAll();
            return lineas;
        }

        @Get('validar-ocupadas')
        async getValidacionLineas(): Promise<Boolean>{
            const validacion: Boolean = await this._lineaService.validarlineasocupadas();
            return validacion;
        }

        @Post()
        async createLinea(@Body() linea: Linea): Promise<Linea>{
           const createdLinea = await this._lineaService.create(linea);
           return createdLinea;

        }

        @Patch(':id')
        async updateLinea(@Param('id',ParseIntPipe) id: number, @Body() linea: Linea){
           await this._lineaService.update(id, linea);
            return true;
        }

        @Delete(':id')
        async deleteLinea(@Param('id',ParseIntPipe) id: number){
            await this._lineaService.delete(id);
            return true;
        }

}
