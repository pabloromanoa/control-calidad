import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaController } from './linea.controller';
import { LineaRepository } from './linea.repository';
import { LineaService } from './linea.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([LineaRepository]), SharedModule],
    providers: [LineaService],
    controllers: [LineaController]
})
export class LineaModule {}
