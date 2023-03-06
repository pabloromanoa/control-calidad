import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { ModeloController } from './modelo.controller';
import { ModeloRepository } from './modelo.repository';
import { ModeloService } from './modelo.service';

@Module({
    imports: [TypeOrmModule.forFeature([ModeloRepository]), SharedModule],
    providers: [ModeloService],
    controllers: [ModeloController]
})
export class ModeloModule {}
