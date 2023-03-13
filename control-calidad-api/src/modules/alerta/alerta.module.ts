import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { SemaforoRepository } from '../semaforo/semaforo.repository';
import { SemaforoService } from '../semaforo/semaforo.service';
import { AlertaController } from './alerta.controller';
import { AlertaRepository } from './alerta.repository';
import { AlertaService } from './alerta.service';

@Module({
    imports: [TypeOrmModule.forFeature([AlertaRepository,SemaforoRepository]), SharedModule],
    providers: [AlertaService,SemaforoService],
    controllers: [AlertaController]
})
export class AlertaModule {}
