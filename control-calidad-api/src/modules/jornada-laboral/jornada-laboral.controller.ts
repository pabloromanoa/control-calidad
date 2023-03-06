import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { JornadaLaboral } from './jornada-laboral.entity';
import { JornadaLaboralService } from './jornada-laboral.service';

@Controller('jornada')
export class JornadaLaboralController {
    constructor(private readonly _jornadaService: JornadaLaboralService){}

        @Get(':id')
        async getJornadaLaboral(@Param('id',ParseIntPipe) id: number): Promise<JornadaLaboral>{
            const jornada = await this._jornadaService.get(id);
            return jornada;
          
        }

        @Get()
        async getJornadasLaboral(): Promise<JornadaLaboral[]>{
            const jornadas: JornadaLaboral[] = await this._jornadaService.getAll();
            return jornadas;
        }

        @Post()
        async createJornadaLaboral(@Body() jornada: JornadaLaboral): Promise<JornadaLaboral>{
           const createdJornadaLaboral = await this._jornadaService.create(jornada);
           return createdJornadaLaboral;

        }

        @Patch(':id')
        async updateJornadaLaboral(@Param('id',ParseIntPipe) id: number, @Body() jornada: JornadaLaboral){
           await this._jornadaService.update(id, jornada);
            return true;
        }

        @Delete(':id')
        async deleteJornadaLaboral(@Param('id',ParseIntPipe) id: number){
            await this._jornadaService.delete(id);
            return true;
        }

}
