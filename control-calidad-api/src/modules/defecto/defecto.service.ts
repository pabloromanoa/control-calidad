import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Defecto } from './defecto.entity';
import { DefectoRepository } from './defecto.repository';

@Injectable()
export class DefectoService {
    constructor(
        @InjectRepository(DefectoRepository)
        private readonly _defectoRepository: DefectoRepository,
        
    ){}

    async get(id: number): Promise<Defecto> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const defecto: Defecto = await this._defectoRepository.findOne(id);

        if(!defecto){
            throw new NotFoundException();
        }

        return defecto;

    }

    async getAll(): Promise<Defecto[]> {
        
        const defectos: Defecto[] = await this._defectoRepository.find();

        
        return defectos;

    }

    async create(defecto: Defecto): Promise<Defecto>{
        try{
            await this.validations(defecto);
            const savedDefecto: Defecto = await this._defectoRepository.save(defecto);
            return savedDefecto;

        }catch(e){
            console.error(e.message);
        }
    }

    async update(id: number, defecto: Defecto): Promise<void>{
        await this._defectoRepository.update(id, defecto);
        
    }

    async delete(id: number): Promise<void>{
        const defectoExist = await this._defectoRepository.findOne(id);

        if(!defectoExist){
            throw new NotFoundException();
        }

        await this._defectoRepository.delete(id);
    }

    async validations(defecto: any){
        if(!defecto.tipo){
            throw new BadRequestException('tipo debe ser enviado');
        }
        if(!defecto.descripcion){
            throw new BadRequestException('descripcion debe ser enviado');
        }
        
    }
}
