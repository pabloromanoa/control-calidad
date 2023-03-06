import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroDefecto } from './registro-defecto.entity';
import { RegistroDefectoRepository } from './registro-defecto.repository';

@Injectable()
export class RegistroDefectoService {
    constructor(
        @InjectRepository(RegistroDefectoRepository)
        private readonly _registroRepository: RegistroDefectoRepository,
        
    ){}

    async get(id: number): Promise<RegistroDefecto> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const registro: RegistroDefecto = await this._registroRepository.findOne(id);

        if(!registro){
            throw new NotFoundException();
        }

        return registro;

    }

    async getAll(): Promise<RegistroDefecto[]> {
        
        const registros: RegistroDefecto[] = await this._registroRepository.find();

        
        return registros;

    }

    async create(registro: RegistroDefecto): Promise<RegistroDefecto>{
        const savedRegistroDefecto: RegistroDefecto = await this._registroRepository.save(registro);
        return savedRegistroDefecto;
    }

    async update(id: number, registro: RegistroDefecto): Promise<void>{
        await this._registroRepository.update(id, registro);
        
    }

    async delete(id: number): Promise<void>{
        const registroExist = await this._registroRepository.findOne(id);

        if(!registroExist){
            throw new NotFoundException();
        }

        await this._registroRepository.delete(id);
    }
}
