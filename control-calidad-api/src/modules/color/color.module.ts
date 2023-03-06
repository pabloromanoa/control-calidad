import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { ColorController } from './color.controller';
import { ColorRepository } from './color.repository';
import { ColorService } from './color.service';

@Module({
    imports: [TypeOrmModule.forFeature([ColorRepository]), SharedModule],
    providers: [ColorService],
    controllers: [ColorController]
})
export class ColorModule {}
