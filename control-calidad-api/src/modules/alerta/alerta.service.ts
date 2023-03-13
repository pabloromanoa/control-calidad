import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Semaforo } from '../semaforo/semaforo.entity';
import { SemaforoService } from '../semaforo/semaforo.service';
import { Alerta } from './alerta.entity';
import { AlertaRepository } from './alerta.repository';

@Injectable()
export class AlertaService {
    constructor(
        @InjectRepository(AlertaRepository)
        private readonly _alertaRepository: AlertaRepository,

        private readonly _semaforoService: SemaforoService,
        
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
        try{

            await this.validations(alerta);
            const savedAlerta: Alerta = await this._alertaRepository.save(alerta);
            return savedAlerta;
        }catch(e){
            console.error(e.message);
        }
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

    async validations(alerta: any){
        if(!alerta.fecha_limite){
            throw new BadRequestException('fecha limite debe ser enviado');
        }
        if(!alerta.fecha_reinicio){
            throw new BadRequestException('fecha reinicio debe ser enviado');
        }
        if(!alerta.tipo){
            throw new BadRequestException('tipo debe ser enviado');
        }
        
        const semaforo: Semaforo = await this._semaforoService.get(alerta.semaforoIdSemaforo);
        if(!semaforo){
            throw new NotFoundException('semaforo ingresado no existe');
        }
    }
}
