import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { TurnoRepository } from './turno.repository';

@Injectable()
export class TurnoService {
    constructor(
        @InjectRepository(TurnoRepository)
        private readonly _turnoRepository: TurnoRepository,
        
    ){}

    async get(id: number): Promise<Turno> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const turno: Turno = await this._turnoRepository.findOne(id);

        if(!turno){
            throw new NotFoundException();
        }

        return turno;

    }

    async getAll(): Promise<Turno[]> {
        
        const turnos: Turno[] = await this._turnoRepository.find();

        
        return turnos;

    }

    async create(turno: Turno): Promise<Turno>{
        const savedTurno: Turno = await this._turnoRepository.save(turno);
        return savedTurno;
    }

    async update(id: number, turno: Turno): Promise<void>{
        await this._turnoRepository.update(id, turno);
        
    }

    async delete(id: number): Promise<void>{
        const turnoExist = await this._turnoRepository.findOne(id);

        if(!turnoExist){
            throw new NotFoundException();
        }

        await this._turnoRepository.delete(id);
    }
}
