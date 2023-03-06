import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RolModule } from './modules/rol/rol.module';
import { SharedModule } from './shared/shared.module';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { TurnoModule } from './modules/turno/turno.module';
import { JornadaLaboralModule } from './modules/jornada-laboral/jornada-laboral.module';
import { OrdenProduccionModule } from './modules/orden-produccion/orden-produccion.module';
import { ModeloModule } from './modules/modelo/modelo.module';
import { ColorModule } from './modules/color/color.module';
import { AlertaModule } from './modules/alerta/alerta.module';
import { SemaforoModule } from './modules/semaforo/semaforo.module';
import { RegistroDefectoModule } from './modules/registro-defecto/registro-defecto.module';
import { DefectoModule } from './modules/defecto/defecto.module';
import { DePrimeraModule } from './modules/de-primera/de-primera.module';
import { LineaModule } from './modules/linea/linea.module';

@Module({
  imports: [ConfigModule, 
    DatabaseModule,
    UserModule, 
    RolModule,
    SharedModule,
    EmpleadoModule,
    TurnoModule,
    JornadaLaboralModule,
    OrdenProduccionModule,
    ModeloModule,
    ColorModule,
    AlertaModule,
    SemaforoModule,
    RegistroDefectoModule,
    DefectoModule,
    DePrimeraModule,
    LineaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
