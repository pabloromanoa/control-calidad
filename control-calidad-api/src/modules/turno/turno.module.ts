import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { TurnoController } from './turno.controller';
import { TurnoRepository } from './turno.repository';
import { TurnoService } from './turno.service';

@Module({
    imports: [TypeOrmModule.forFeature([TurnoRepository]), SharedModule],
    providers: [TurnoService],
    controllers: [TurnoController]
})
export class TurnoModule {}
