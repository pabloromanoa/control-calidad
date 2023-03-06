import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { OrdenProduccionController } from './orden-produccion.controller';
import { OrdenProduccionRepository } from './orden-produccion.repository';
import { OrdenProduccionService } from './orden-produccion.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrdenProduccionRepository]), SharedModule],
    providers: [OrdenProduccionService],
    controllers: [OrdenProduccionController]
})
export class OrdenProduccionModule {}
