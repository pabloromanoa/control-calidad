import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JornadaLaboral } from './jornada-laboral.entity';
import { JornadaLaboralRepository } from './jornada-laboral.repository';

@Injectable()
export class JornadaLaboralService {
    constructor(
        @InjectRepository(JornadaLaboralRepository)
        private readonly _jornadaLaboralRepository: JornadaLaboralRepository,
        
    ){}

    async get(id: number): Promise<JornadaLaboral> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const jornada: JornadaLaboral = await this._jornadaLaboralRepository.findOne(id);

        if(!jornada){
            throw new NotFoundException();
        }

        return jornada;

    }

    async getAll(): Promise<JornadaLaboral[]> {
        
        const jornadas: JornadaLaboral[] = await this._jornadaLaboralRepository.find();

        
        return jornadas;

    }

    async create(jornada: JornadaLaboral): Promise<JornadaLaboral>{
        const savedJornadaLaboral: JornadaLaboral = await this._jornadaLaboralRepository.save(jornada);
        return savedJornadaLaboral;
    }

    async update(id: number, jornada: JornadaLaboral): Promise<void>{
        await this._jornadaLaboralRepository.update(id, jornada);
        
    }

    async delete(id: number): Promise<void>{
        const jornadaExist = await this._jornadaLaboralRepository.findOne(id);

        if(!jornadaExist){
            throw new NotFoundException();
        }

        await this._jornadaLaboralRepository.delete(id);
    }
}
