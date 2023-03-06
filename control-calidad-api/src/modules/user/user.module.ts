import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { RolRepository } from '../rol/rol.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository,RolRepository]),SharedModule,],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
