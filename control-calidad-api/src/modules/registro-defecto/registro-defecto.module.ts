import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { RegistroDefectoController } from './registro-defecto.controller';
import { RegistroDefectoRepository } from './registro-defecto.repository';
import { RegistroDefectoService } from './registro-defecto.service';

@Module({
    imports: [TypeOrmModule.forFeature([RegistroDefectoRepository]), SharedModule],
    providers: [RegistroDefectoService],
    controllers: [RegistroDefectoController]
})
export class RegistroDefectoModule {}
