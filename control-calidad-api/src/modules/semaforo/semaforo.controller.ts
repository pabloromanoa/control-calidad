import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Semaforo } from './semaforo.entity';
import { SemaforoService } from './semaforo.service';

@Controller('semaforo')
export class SemaforoController {
    constructor(private readonly _semaforoService: SemaforoService){}

        @Get(':id')
        async getSemaforo(@Param('id',ParseIntPipe) id: number): Promise<Semaforo>{
            const semaforo = await this._semaforoService.get(id);
            return semaforo;
          
        }

        @Get()
        async getSemaforos(): Promise<Semaforo[]>{
            const semaforos: Semaforo[] = await this._semaforoService.getAll();
            return semaforos;
        }

        @Post()
        async createSemaforo(@Body() semaforo: Semaforo): Promise<Semaforo>{
           const createdSemaforo = await this._semaforoService.create(semaforo);
           return createdSemaforo;

        }

        @Patch(':id')
        async updateSemaforo(@Param('id',ParseIntPipe) id: number, @Body() semaforo: Semaforo){
           await this._semaforoService.update(id, semaforo);
            return true;
        }

        @Delete(':id')
        async deleteSemaforo(@Param('id',ParseIntPipe) id: number){
            await this._semaforoService.delete(id);
            return true;
        }

}
