import { Injectable } from '@nestjs/common';
import { console_colors } from '../../console-colors';

export interface Log{
   status: number,
   response: any,
}

@Injectable()
export class Loggers {
   
   constructor(){}

   async createLog(log){
      console.log(console_colors.fg.yellow,"================================");
      console.log(log);
      console.log(console_colors.fg.yellow, "================================");
   }

}
