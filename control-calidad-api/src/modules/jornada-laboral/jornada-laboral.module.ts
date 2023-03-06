import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JornadaLaboralController } from './jornada-laboral.controller';
import { JornadaLaboralRepository } from './jornada-laboral.repository';
import { JornadaLaboralService } from './jornada-laboral.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([JornadaLaboralRepository]), SharedModule],
    providers: [JornadaLaboralService],
    controllers: [JornadaLaboralController]
})
export class JornadaLaboralModule {}
