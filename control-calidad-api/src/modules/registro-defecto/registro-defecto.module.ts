import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { JornadaLaboralRepository } from '../jornada-laboral/jornada-laboral.repository';
import { JornadaLaboralService } from '../jornada-laboral/jornada-laboral.service';
import { RegistroDefectoController } from './registro-defecto.controller';
import { RegistroDefectoRepository } from './registro-defecto.repository';
import { RegistroDefectoService } from './registro-defecto.service';

@Module({
    imports: [TypeOrmModule.forFeature([RegistroDefectoRepository,JornadaLaboralRepository]), SharedModule],
    providers: [RegistroDefectoService,JornadaLaboralService],
    controllers: [RegistroDefectoController]
})
export class RegistroDefectoModule {}
