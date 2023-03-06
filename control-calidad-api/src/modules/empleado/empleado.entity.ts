import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JornadaLaboral } from "../jornada-laboral/jornada-laboral.entity";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";
import { Turno } from "../turno/turno.entity";


@Entity('empleados')
export class Empleado extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_empleado: number;

    @ManyToOne(() => JornadaLaboral, (jornada: JornadaLaboral) => jornada.empleados, {eager: true})
    jornada: JornadaLaboral;
    
    @ManyToOne(() => Turno, (turno: Turno) => turno.empleados, {eager: true})
    turno: Turno;

    @OneToMany(() => OrdenProduccion, (ordenes: OrdenProduccion) => ordenes.empleado)
    ordenes: OrdenProduccion[];

    @Column({type: 'varchar', length: 30, nullable: false})
    nombre: string;

    @Column({type: 'varchar', length: 30, nullable: false})
    apellido: string;

    @Column({type: 'text', nullable: false})
    dni: string;

    @Column({type: 'text', nullable: false})
    mail: string;

}