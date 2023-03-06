import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenProduccion } from './orden-produccion.entity';
import { OrdenProduccionRepository } from './orden-produccion.repository';

@Injectable()
export class OrdenProduccionService {
    constructor(
        @InjectRepository(OrdenProduccionRepository)
        private readonly _ordenProduccionRepository: OrdenProduccionRepository,
        
    ){}

    async get(id: number): Promise<OrdenProduccion> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const orden: OrdenProduccion = await this._ordenProduccionRepository.findOne(id);

        if(!orden){
            throw new NotFoundException();
        }

        return orden;

    }

    async getAll(): Promise<OrdenProduccion[]> {
        
        const ordenes: OrdenProduccion[] = await this._ordenProduccionRepository.find();

        
        return ordenes;

    }

    async create(orden: OrdenProduccion): Promise<OrdenProduccion>{
        const savedOrdenProduccion: OrdenProduccion = await this._ordenProduccionRepository.save(orden);
        return savedOrdenProduccion;
    }

    async update(id: number, orden: OrdenProduccion): Promise<void>{
        await this._ordenProduccionRepository.update(id, orden);
        
    }

    async delete(id: number): Promise<void>{
        const ordenExist = await this._ordenProduccionRepository.findOne(id);

        if(!ordenExist){
            throw new NotFoundException();
        }

        await this._ordenProduccionRepository.delete(id);
    }
}
