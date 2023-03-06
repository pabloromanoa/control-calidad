import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alerta } from './alerta.entity';
import { AlertaRepository } from './alerta.repository';

@Injectable()
export class AlertaService {
    constructor(
        @InjectRepository(AlertaRepository)
        private readonly _alertaRepository: AlertaRepository,
        
    ){}

    async get(id: number): Promise<Alerta> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const alerta: Alerta = await this._alertaRepository.findOne(id);

        if(!alerta){
            throw new NotFoundException();
        }

        return alerta;

    }

    async getAll(): Promise<Alerta[]> {
        
        const alertas: Alerta[] = await this._alertaRepository.find();

        
        return alertas;

    }

    async create(alerta: Alerta): Promise<Alerta>{
        const savedAlerta: Alerta = await this._alertaRepository.save(alerta);
        return savedAlerta;
    }

    async update(id: number, alerta: Alerta): Promise<void>{
        await this._alertaRepository.update(id, alerta);
        
    }

    async delete(id: number): Promise<void>{
        const alertaExist = await this._alertaRepository.findOne(id);

        if(!alertaExist){
            throw new NotFoundException();
        }

        await this._alertaRepository.delete(id);
    }
}
