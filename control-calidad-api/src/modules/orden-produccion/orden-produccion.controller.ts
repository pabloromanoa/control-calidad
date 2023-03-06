import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { OrdenProduccion } from './orden-produccion.entity';
import { OrdenProduccionService } from './orden-produccion.service';

@Controller('orden-produccion')
export class OrdenProduccionController {
    constructor(private readonly _ordenProduccionService: OrdenProduccionService){}

        @Get(':id')
        async getOrdenProduccion(@Param('id',ParseIntPipe) id: number): Promise<OrdenProduccion>{
            const orden = await this._ordenProduccionService.get(id);
            return orden;
          
        }

        @Get()
        async getOrdenesProduccion(): Promise<OrdenProduccion[]>{
            const ordenes: OrdenProduccion[] = await this._ordenProduccionService.getAll();
            return ordenes;
        }

        @Post()
        async createOrdenProduccion(@Body() orden: OrdenProduccion): Promise<OrdenProduccion>{
           const createdOrdenProduccion = await this._ordenProduccionService.create(orden);
           return createdOrdenProduccion;

        }

        @Patch(':id')
        async updateOrdenProduccion(@Param('id',ParseIntPipe) id: number, @Body() orden: OrdenProduccion){
           await this._ordenProduccionService.update(id, orden);
            return true;
        }

        @Delete(':id')
        async deleteOrdenProduccion(@Param('id',ParseIntPipe) id: number){
            await this._ordenProduccionService.delete(id);
            return true;
        }

}
