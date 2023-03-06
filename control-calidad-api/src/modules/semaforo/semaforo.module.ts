import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemaforoController } from './semaforo.controller';
import { SemaforoRepository } from './semaforo.repository';
import { SemaforoService } from './semaforo.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([SemaforoRepository]), SharedModule],
    providers: [SemaforoService],
    controllers: [SemaforoController]
})
export class SemaforoModule {}
