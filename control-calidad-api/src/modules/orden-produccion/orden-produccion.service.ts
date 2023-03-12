import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../color/color.entity';
import { ColorService } from '../color/color.service';
import { Linea } from '../linea/linea.entity';
import { LineaService } from '../linea/linea.service';
import { Modelo } from '../modelo/modelo.entity';
import { ModeloService } from '../modelo/modelo.service';
import { OrdenProduccion } from './orden-produccion.entity';
import { OrdenProduccionRepository } from './orden-produccion.repository';

@Injectable()
export class OrdenProduccionService {
    constructor(
        @InjectRepository(OrdenProduccionRepository)
        private readonly _ordenProduccionRepository: OrdenProduccionRepository,

        private readonly _lineaService: LineaService,
        private readonly _modeloService: ModeloService,
        private readonly _colorService: ColorService,
        
        
    ){}

    async get(id: number): Promise<OrdenProduccion> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const orden: OrdenProduccion = await this._ordenProduccionRepository.findOne(id);

        if(!orden){
            throw new NotFoundException();
        }

        return orden;

    }

    async getAll(): Promise<OrdenProduccion[]> {
        
        const ordenes: OrdenProduccion[] = await this._ordenProduccionRepository.find();

        
        return ordenes;

    }

    async create(orden: OrdenProduccion): Promise<OrdenProduccion>{
        const savedOrdenProduccion: OrdenProduccion = await this._ordenProduccionRepository.save(orden);

        await this.validations(savedOrdenProduccion);
        return savedOrdenProduccion;
    }

    async update(id: number, orden: OrdenProduccion): Promise<void>{
        await this._ordenProduccionRepository.update(id, orden);
        
    }

    async delete(id: number): Promise<void>{
        const ordenExist = await this._ordenProduccionRepository.findOne(id);

        if(!ordenExist){
            throw new NotFoundException();
        }

        await this._ordenProduccionRepository.delete(id);
    }

    async validations(orden: OrdenProduccion){
        if(!orden.numero){
            throw new BadRequestException('numero debe ser enviado');
        }
        if(!orden.inicio){
            throw new BadRequestException('inicio debe ser enviado');
        }
        if(!orden.fin){
            throw new BadRequestException('fin debe ser enviado');
        }
        if(!orden.modelo){
            throw new BadRequestException('modelo debe ser enviado');
        }
        if(!orden.color){
            throw new BadRequestException('color debe ser enviado');
        }
        if(!orden.linea){
            throw new BadRequestException('linea debe ser enviado');
        }
        const linea: Linea = await this._lineaService.get(orden.linea.id_linea);
        if(linea){
            throw new NotFoundException('linea ingresada no existe');
        }
        const modelo: Modelo = await this._modeloService.get(orden.modelo.id_modelo);
        if(modelo){
            throw new NotFoundException('modelo ingresado no existe');
        }
        const color: Color = await this._colorService.get(orden.color.id_color);
        if(color){
            throw new NotFoundException('color ingresado no existe');
        }
    }
}
