import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modelo } from './modelo.entity';
import { ModeloRepository } from './modelo.repository';

@Injectable()
export class ModeloService {
    constructor(
        @InjectRepository(ModeloRepository)
        private readonly _modeloRepository: ModeloRepository,
        
    ){}

    async get(id: number): Promise<Modelo> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const modelo: Modelo = await this._modeloRepository.findOne(id);

        if(!modelo){
            throw new NotFoundException();
        }

        return modelo;

    }

    async getAll(): Promise<Modelo[]> {
        
        const modelos: Modelo[] = await this._modeloRepository.find();

        
        return modelos;

    }

    async create(modelo: Modelo): Promise<Modelo>{
        try{
            await this.validations(modelo);
            const savedModelo: Modelo = await this._modeloRepository.save(modelo);
            return savedModelo;         
        }catch(e){
            console.error(e.message);
        }
    }

    async update(id: number, modelo: Modelo): Promise<void>{
        await this._modeloRepository.update(id, modelo);
        
    }

    async delete(id: number): Promise<void>{
        const modeloExist = await this._modeloRepository.findOne(id);

        if(!modeloExist){
            throw new NotFoundException();
        }

        await this._modeloRepository.delete(id);
    }

    async validations(modelo: any){
        if(!modelo.sku){
            throw new BadRequestException('sku debe ser enviado');
        }
        if(!modelo.descripcion){
            throw new BadRequestException('descripcion debe ser enviado');
        }
        if(!modelo.limite_inferior_observable){
            throw new BadRequestException('limite_inferior_observable debe ser enviado');
        }
        if(!modelo.limite_inferior_reproceso){
            throw new BadRequestException('limite_inferior_reproceso debe ser enviado');
        }
        if(!modelo.limite_superior_observable){
            throw new BadRequestException('limite_superior_observable debe ser enviado');
        }
        if(!modelo.limite_superior_reproceso){
            throw new BadRequestException('limite_superior_reproceso debe ser enviado');
        }
        
    }
}
