import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alerta } from "../alerta/alerta.entity";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";

enum EstadoSemaforo {
    ROJO = "ROJO",
    AMARILLO = "AMARILLO",
    VERDE = "VERDE"
 }

@Entity('semaforos')
export class Semaforo extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_semaforo: number;

    @OneToMany(() => Alerta, (alertas: Alerta) => alertas.semaforo)
    alertas: Alerta[];

    @Column({type: 'varchar', nullable: false})
    estado: EstadoSemaforo;

}