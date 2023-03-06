import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './empleado.entity';
import { EmpleadoRepository } from './empleado.repository';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(EmpleadoRepository)
        private readonly _empleadoRepository: EmpleadoRepository,
        
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
        const savedEmpleado: Empleado = await this._empleadoRepository.save(empleado);
        return savedEmpleado;
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
}
