import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoRepository } from './empleado.repository';
import { EmpleadoService } from './empleado.service';
import { SharedModule } from '../../shared/shared.module';
import { JornadaLaboralRepository } from '../jornada-laboral/jornada-laboral.repository';
import { JornadaLaboralService } from '../jornada-laboral/jornada-laboral.service';

@Module({
    imports: [TypeOrmModule.forFeature([EmpleadoRepository,JornadaLaboralRepository]), SharedModule],
    providers: [EmpleadoService,JornadaLaboralService],
    controllers: [EmpleadoController]
})
export class EmpleadoModule {}
