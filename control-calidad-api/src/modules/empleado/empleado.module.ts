import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoRepository } from './empleado.repository';
import { EmpleadoService } from './empleado.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([EmpleadoRepository]), SharedModule],
    providers: [EmpleadoService],
    controllers: [EmpleadoController]
})
export class EmpleadoModule {}
