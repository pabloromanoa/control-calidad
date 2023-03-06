import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Alerta } from './alerta.entity';
import { AlertaService } from './alerta.service';

@Controller('alerta')
export class AlertaController {
    constructor(private readonly _alertaService: AlertaService){}

        @Get(':id')
        async getAlerta(@Param('id',ParseIntPipe) id: number): Promise<Alerta>{
            const alerta = await this._alertaService.get(id);
            return alerta;
          
        }

        @Get()
        async getAlertas(): Promise<Alerta[]>{
            const alertas: Alerta[] = await this._alertaService.getAll();
            return alertas;
        }

        @Post()
        async createAlerta(@Body() alerta: Alerta): Promise<Alerta>{
           const createdAlerta = await this._alertaService.create(alerta);
           return createdAlerta;

        }

        @Patch(':id')
        async updateAlerta(@Param('id',ParseIntPipe) id: number, @Body() alerta: Alerta){
           await this._alertaService.update(id, alerta);
            return true;
        }

        @Delete(':id')
        async deleteAlerta(@Param('id',ParseIntPipe) id: number){
            await this._alertaService.delete(id);
            return true;
        }

}
