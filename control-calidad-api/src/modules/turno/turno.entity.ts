import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empleado } from "../empleado/empleado.entity";
import { JornadaLaboral } from "../jornada-laboral/jornada-laboral.entity";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";


@Entity('turnos')
export class Turno extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_turno: number;

    @OneToMany(() => Empleado, (empleados: Empleado) => empleados.turno)
    empleados: Empleado[];

    @ManyToOne(() => JornadaLaboral, (jornada: JornadaLaboral) => jornada.turnos, {eager: true})
    jornada: JornadaLaboral;

    @Column({type: 'varchar', length: 30, nullable: false})
    descripcion: string;

    @Column({type: 'integer', nullable: false})
    hora_inicio: number;

    @Column({type: 'integer', nullable: false})
    hora_fin: number;

}