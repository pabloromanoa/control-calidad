import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { DefectoController } from './defecto.controller';
import { DefectoRepository } from './defecto.repository';
import { DefectoService } from './defecto.service';

@Module({
    imports: [TypeOrmModule.forFeature([DefectoRepository]), SharedModule],
    providers: [DefectoService],
    controllers: [DefectoController]
})
export class DefectoModule {}
