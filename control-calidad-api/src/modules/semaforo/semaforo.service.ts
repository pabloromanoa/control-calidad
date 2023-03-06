import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Semaforo } from './semaforo.entity';
import { SemaforoRepository } from './semaforo.repository';

@Injectable()
export class SemaforoService {
    constructor(
        @InjectRepository(SemaforoRepository)
        private readonly _semaforoRepository: SemaforoRepository,
        
    ){}

    async get(id: number): Promise<Semaforo> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const semaforo: Semaforo = await this._semaforoRepository.findOne(id);

        if(!semaforo){
            throw new NotFoundException();
        }

        return semaforo;

    }

    async getAll(): Promise<Semaforo[]> {
        
        const semaforos: Semaforo[] = await this._semaforoRepository.find();

        
        return semaforos;

    }

    async create(semaforo: Semaforo): Promise<Semaforo>{
        const savedSemaforo: Semaforo = await this._semaforoRepository.save(semaforo);
        return savedSemaforo;
    }

    async update(id: number, semaforo: Semaforo): Promise<void>{
        await this._semaforoRepository.update(id, semaforo);
        
    }

    async delete(id: number): Promise<void>{
        const semaforoExist = await this._semaforoRepository.findOne(id);

        if(!semaforoExist){
            throw new NotFoundException();
        }

        await this._semaforoRepository.delete(id);
    }
}
