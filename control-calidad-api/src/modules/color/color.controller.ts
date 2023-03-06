import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Color } from './color.entity';
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
    constructor(private readonly _colorService: ColorService){}

        @Get(':id')
        async getColor(@Param('id',ParseIntPipe) id: number): Promise<Color>{
            const color = await this._colorService.get(id);
            return color;
          
        }

        @Get()
        async getColores(): Promise<Color[]>{
            const colores: Color[] = await this._colorService.getAll();
            return colores;
        }

        @Post()
        async createColor(@Body() color: Color): Promise<Color>{
           const createdColor = await this._colorService.create(color);
           return createdColor;

        }

        @Patch(':id')
        async updateColor(@Param('id',ParseIntPipe) id: number, @Body() color: Color){
           await this._colorService.update(id, color);
            return true;
        }

        @Delete(':id')
        async deleteColor(@Param('id',ParseIntPipe) id: number){
            await this._colorService.delete(id);
            return true;
        }

}
