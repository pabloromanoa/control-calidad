import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './color.entity';
import { ColorRepository } from './color.repository';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(ColorRepository)
        private readonly _colorRepository: ColorRepository,
        
    ){}

    async get(id: number): Promise<Color> {
        if(!id){
            throw new BadRequestException('id must be sent');
        }

        const color: Color = await this._colorRepository.findOne(id);

        if(!color){
            throw new NotFoundException();
        }

        return color;

    }

    async getAll(): Promise<Color[]> {
        
        const colores: Color[] = await this._colorRepository.find();

        
        return colores;

    }

    async create(color: Color): Promise<Color>{
        const savedColor: Color = await this._colorRepository.save(color);
        return savedColor;
    }

    async update(id: number, color: Color): Promise<void>{
        await this._colorRepository.update(id, color);
        
    }

    async delete(id: number): Promise<void>{
        const colorExist = await this._colorRepository.findOne(id);

        if(!colorExist){
            throw new NotFoundException();
        }

        await this._colorRepository.delete(id);
    }
}
