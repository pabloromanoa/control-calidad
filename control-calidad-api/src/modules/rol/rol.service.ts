import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { RolRepository } from './rol.repository';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolRepository)
        private readonly _rolRepository: RolRepository,
        
    ){}

    async get(id: number): Promise<Rol> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const rol: Rol = await this._rolRepository.findOne(id);

        if(!rol){
            throw new NotFoundException();
        }

        return rol;

    }

    async getAll(): Promise<Rol[]> {
        
        const roles: Rol[] = await this._rolRepository.find();

        
        return roles;

    }

    async create(rol: Rol): Promise<Rol>{
        const savedRol: Rol = await this._rolRepository.save(rol);
        return savedRol;
    }

    async update(id: number, rol: Rol): Promise<void>{
        await this._rolRepository.update(id, rol);
        
    }

    async delete(id: number): Promise<void>{
        const rolExist = await this._rolRepository.findOne(id);

        if(!rolExist){
            throw new NotFoundException();
        }

        await this._rolRepository.delete(id);
    }
}
