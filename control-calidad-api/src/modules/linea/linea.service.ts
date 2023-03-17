import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from './linea.entity';
import { LineaRepository } from './linea.repository';

@Injectable()
export class LineaService {
    constructor(
        @InjectRepository(LineaRepository)
        private readonly _lineaRepository: LineaRepository,
        
    ){}

    async get(id: number): Promise<Linea> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const linea: Linea = await this._lineaRepository.findOne(id);

        if(!linea){
            throw new NotFoundException();
        }

        return linea;

    }

    async getAll(): Promise<Linea[]> {
        
        const lineas: Linea[] = await this._lineaRepository.find();

        
        return lineas;

    }

    async create(linea: Linea): Promise<Linea>{
        try{
            await this.validations(linea);
    
            const savedLinea: Linea = await this._lineaRepository.save(linea);
            return savedLinea;

        }catch(e){
            console.error(e.message);
        }
    }

    async update(id: number, linea: Linea): Promise<void>{
        await this._lineaRepository.update(id, linea);
        
    }

    async delete(id: number): Promise<void>{
        const lineaExist = await this._lineaRepository.findOne(id);

        if(!lineaExist){
            throw new NotFoundException();
        }

        await this._lineaRepository.delete(id);
    }

    async validations(linea: any){
        if(!linea.numero){
            throw new BadRequestException('numero debe ser enviado');
        }
        if(!linea.descripcion){
            throw new BadRequestException('descripcion debe ser enviado');
        }
        
    }

    async getLineasDisp(): Promise<Linea[]> {

        const lineas: Linea[] = await this.getAll();
        var lineasDisp: Linea[] = lineas.filter(l => !l.ordenes.filter(o => o.estado == "INICIADA"));

        return lineasDisp;

    }
    
}
