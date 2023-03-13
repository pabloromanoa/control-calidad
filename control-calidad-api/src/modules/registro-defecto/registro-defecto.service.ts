import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JornadaLaboral } from '../jornada-laboral/jornada-laboral.entity';
import { JornadaLaboralService } from '../jornada-laboral/jornada-laboral.service';
import { RegistroDefecto } from './registro-defecto.entity';
import { RegistroDefectoRepository } from './registro-defecto.repository';

@Injectable()
export class RegistroDefectoService {
    constructor(
        @InjectRepository(RegistroDefectoRepository)
        private readonly _registroRepository: RegistroDefectoRepository,

        private readonly _jornadaService: JornadaLaboralService,
        
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
        try{
            await this.validations(registro);
    
            const savedRegistroDefecto: RegistroDefecto = await this._registroRepository.save(registro);
    
            return savedRegistroDefecto;

        }catch(e){
            console.error(e.message);
        }
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

    async validations(registro: any){
        if(!registro.hora){
            throw new BadRequestException('hora debe ser enviado');
        }
        if(!registro.pie){
            throw new BadRequestException('pie debe ser enviado');
        }
        const jornada: JornadaLaboral = await this._jornadaService.get(registro.jornadaIdJornada);
        if(!jornada){
            throw new NotFoundException('jornada ingresada no existe');
        }
        
    }
}
