import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Defecto } from './defecto.entity';
import { DefectoService } from './defecto.service';

@Controller('defecto')
export class DefectoController {
    constructor(private readonly _defectoService: DefectoService){}

        @Get(':id')
        async getDefecto(@Param('id',ParseIntPipe) id: number): Promise<Defecto>{
            const defecto = await this._defectoService.get(id);
            return defecto;
          
        }

        @Get()
        async getDefectos(): Promise<Defecto[]>{
            const defectos: Defecto[] = await this._defectoService.getAll();
            return defectos;
        }

        @Post()
        async createDefecto(@Body() defecto: Defecto): Promise<Defecto>{
           const createdDefecto = await this._defectoService.create(defecto);
           return createdDefecto;

        }

        @Patch(':id')
        async updateDefecto(@Param('id',ParseIntPipe) id: number, @Body() defecto: Defecto){
           await this._defectoService.update(id, defecto);
            return true;
        }

        @Delete(':id')
        async deleteDefecto(@Param('id',ParseIntPipe) id: number){
            await this._defectoService.delete(id);
            return true;
        }

}
