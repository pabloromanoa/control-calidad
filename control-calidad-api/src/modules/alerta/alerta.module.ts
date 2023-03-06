import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { AlertaController } from './alerta.controller';
import { AlertaRepository } from './alerta.repository';
import { AlertaService } from './alerta.service';

@Module({
    imports: [TypeOrmModule.forFeature([AlertaRepository]), SharedModule],
    providers: [AlertaService],
    controllers: [AlertaController]
})
export class AlertaModule {}
