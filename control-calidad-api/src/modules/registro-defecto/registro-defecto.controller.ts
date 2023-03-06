import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { RegistroDefecto } from './registro-defecto.entity';
import { RegistroDefectoService } from './registro-defecto.service';

@Controller('registro')
export class RegistroDefectoController {
    constructor(private readonly _registroService: RegistroDefectoService){}

        @Get(':id')
        async getRegistroDefecto(@Param('id',ParseIntPipe) id: number): Promise<RegistroDefecto>{
            const registro = await this._registroService.get(id);
            return registro;
          
        }

        @Get()
        async getRegistrosDefecto(): Promise<RegistroDefecto[]>{
            const registros: RegistroDefecto[] = await this._registroService.getAll();
            return registros;
        }

        @Post()
        async createRegistroDefecto(@Body() registro: RegistroDefecto): Promise<RegistroDefecto>{
           const createdRegistroDefecto = await this._registroService.create(registro);
           return createdRegistroDefecto;

        }

        @Patch(':id')
        async updateRegistroDefecto(@Param('id',ParseIntPipe) id: number, @Body() registro: RegistroDefecto){
           await this._registroService.update(id, registro);
            return true;
        }

        @Delete(':id')
        async deleteRegistroDefecto(@Param('id',ParseIntPipe) id: number){
            await this._registroService.delete(id);
            return true;
        }

}
