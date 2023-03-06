import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Turno } from './turno.entity';
import { TurnoService } from './turno.service';

@Controller('turno')
export class TurnoController {
    constructor(private readonly _turnoService: TurnoService){}

        @Get(':id')
        async getTurno(@Param('id',ParseIntPipe) id: number): Promise<Turno>{
            const turno = await this._turnoService.get(id);
            return turno;
          
        }

        @Get()
        async getTurnos(): Promise<Turno[]>{
            const turnos: Turno[] = await this._turnoService.getAll();
            return turnos;
        }

        @Post()
        async createTurno(@Body() turno: Turno): Promise<Turno>{
           const createdTurno = await this._turnoService.create(turno);
           return createdTurno;

        }

        @Patch(':id')
        async updateTurno(@Param('id',ParseIntPipe) id: number, @Body() turno: Turno){
           await this._turnoService.update(id, turno);
            return true;
        }

        @Delete(':id')
        async deleteTurno(@Param('id',ParseIntPipe) id: number){
            await this._turnoService.delete(id);
            return true;
        }

}
