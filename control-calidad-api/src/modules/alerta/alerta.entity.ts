import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JornadaLaboral } from "../jornada-laboral/jornada-laboral.entity";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";
import { Semaforo } from "../semaforo/semaforo.entity";

enum Tipo {
    observado = "observado",
    reproceso = "reproceso",
 }

@Entity('alertas')
export class Alerta extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_alerta: number;

    @ManyToOne(() => OrdenProduccion, (orden: OrdenProduccion) => orden.alertas, {eager: true})
    orden: OrdenProduccion;

    @ManyToOne(() => Semaforo, (semaforo: Semaforo) => semaforo.alertas, {eager: true})
    semaforo: Semaforo;

    @Column({type: 'timestamp', nullable: false})
    fecha_limite: Date;

    @Column({type: 'timestamp', nullable: false})
    fecha_reinicio: Date;

    @Column({type: 'text', nullable: false})
    tipo: Tipo;
}