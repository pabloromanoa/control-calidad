import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empleado } from "../empleado/empleado.entity";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";
import { RegistroDefecto } from "../registro-defecto/registro-defecto.entity";
import { Turno } from "../turno/turno.entity";


@Entity('jornadas-laboral')
export class JornadaLaboral extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_jornada: number;

    @OneToMany(() => Empleado, (empleados: Empleado) => empleados.jornada)
    empleados: Empleado[];

    @OneToMany(() => Turno, (turnos: Turno) => turnos.jornada)
    turnos: Turno[];

    @OneToMany(() => RegistroDefecto, (registros: RegistroDefecto) => registros.jornada)
    registros: RegistroDefecto[];

    @ManyToOne(() => OrdenProduccion, (orden: OrdenProduccion) => orden.jornadas)
    orden: OrdenProduccion;

    @Column({type: 'timestamp', nullable: false})
    fecha_inicio: Date;

    @Column({type: 'timestamp', nullable: false})
    fecha_fin: Date;

    @Column({type: 'integer', nullable: false, default: 0})
    total_primera: number;

    @Column({type: 'integer', nullable: false, default: 0})
    total_segunda: number;

    @Column({type: 'integer', nullable: false, default: 0})
    total_hermanado: number;

}