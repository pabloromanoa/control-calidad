import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Rol } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
    constructor(private readonly _rolService: RolService){}

        @Get(':id')
        async getRol(@Param('id',ParseIntPipe) id: number): Promise<Rol>{
            const rol = await this._rolService.get(id);
            return rol;
          
        }

        @Get()
        async getRoles(): Promise<Rol[]>{
            const roles: Rol[] = await this._rolService.getAll();
            return roles;
        }

        @Post()
        async createRol(@Body() rol: Rol): Promise<Rol>{
           const createdRol = await this._rolService.create(rol);
           return createdRol;

        }

        @Patch(':id')
        async updateRol(@Param('id',ParseIntPipe) id: number, @Body() rol: Rol){
           await this._rolService.update(id, rol);
            return true;
        }

        @Delete(':id')
        async deleteRol(@Param('id',ParseIntPipe) id: number){
            await this._rolService.delete(id);
            return true;
        }

}
