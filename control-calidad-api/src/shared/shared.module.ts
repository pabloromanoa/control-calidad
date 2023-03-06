import { Module } from '@nestjs/common';
import { Loggers } from './resp/logger.service';


@Module({
    providers: [Loggers],
    exports: [Loggers],
  })
  export class SharedModule {}
    
  