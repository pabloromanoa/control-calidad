import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JornadaLaboral } from '../jornada-laboral/jornada-laboral.entity';
import { JornadaLaboralService } from '../jornada-laboral/jornada-laboral.service';
import { Empleado } from './empleado.entity';
import { EmpleadoRepository } from './empleado.repository';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(EmpleadoRepository)
        private readonly _empleadoRepository: EmpleadoRepository,

        private readonly _jornadaService: JornadaLaboralService,
        
    ){}

    async get(id: number): Promise<Empleado> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const empleado: Empleado = await this._empleadoRepository.findOne(id);

        if(!empleado){
            throw new NotFoundException();
        }

        return empleado;

    }

    async getAll(): Promise<Empleado[]> {
        
        const empleados: Empleado[] = await this._empleadoRepository.find();

        
        return empleados;

    }

    async create(empleado: Empleado): Promise<Empleado>{
        try{
            await this.validations(empleado);
    
            const savedEmpleado: Empleado = await this._empleadoRepository.save(empleado);
            return savedEmpleado;

        }catch(e){
            console.error(e.message);
        }
    }

    async update(id: number, empleado: Empleado): Promise<void>{
        await this._empleadoRepository.update(id, empleado);
        
    }

    async delete(id: number): Promise<void>{
        const empleadoExist = await this._empleadoRepository.findOne(id);

        if(!empleadoExist){
            throw new NotFoundException();
        }

        await this._empleadoRepository.delete(id);
    }

    async validations(empleado: any){
        if(!empleado.nombre){
            throw new BadRequestException('nombre debe ser enviado');
        }
        if(!empleado.apellido){
            throw new BadRequestException('apellido debe ser enviado');
        }
        if(!empleado.dni){
            throw new BadRequestException('dni debe ser enviado');
        }
        if(!empleado.mail){
            throw new BadRequestException('mail debe ser enviado');
        }
        
        const jornada: JornadaLaboral = await this._jornadaService.get(empleado.jornadaIdJornada);
        if(!jornada){
            throw new NotFoundException('jornada ingresado no existe');
        }
    }
}
