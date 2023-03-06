import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Empleado } from './empleado.entity';
import { EmpleadoService } from './empleado.service';

@Controller('empleado')
export class EmpleadoController {
    constructor(private readonly _empleadoService: EmpleadoService){}

        @Get(':id')
        async getEmpleado(@Param('id',ParseIntPipe) id: number): Promise<Empleado>{
            const empleado = await this._empleadoService.get(id);
            return empleado;
          
        }

        @Get()
        async getEmpleados(): Promise<Empleado[]>{
            const empleados: Empleado[] = await this._empleadoService.getAll();
            return empleados;
        }

        @Post()
        async createEmpleado(@Body() empleado: Empleado): Promise<Empleado>{
           const createdEmpleado = await this._empleadoService.create(empleado);
           return createdEmpleado;

        }

        @Patch(':id')
        async updateEmpleado(@Param('id',ParseIntPipe) id: number, @Body() empleado: Empleado){
           await this._empleadoService.update(id, empleado);
            return true;
        }

        @Delete(':id')
        async deleteEmpleado(@Param('id',ParseIntPipe) id: number){
            await this._empleadoService.delete(id);
            return true;
        }

}
