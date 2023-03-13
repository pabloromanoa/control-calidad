import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { ColorRepository } from '../color/color.repository';
import { ColorService } from '../color/color.service';
import { LineaRepository } from '../linea/linea.repository';
import { LineaService } from '../linea/linea.service';
import { ModeloRepository } from '../modelo/modelo.repository';
import { ModeloService } from '../modelo/modelo.service';
import { OrdenProduccionController } from './orden-produccion.controller';
import { OrdenProduccionRepository } from './orden-produccion.repository';
import { OrdenProduccionService } from './orden-produccion.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrdenProduccionRepository,LineaRepository,ColorRepository,ModeloRepository]), SharedModule],
    providers: [OrdenProduccionService,LineaService,ColorService,ModeloService],
    controllers: [OrdenProduccionController]
})
export class OrdenProduccionModule {}
