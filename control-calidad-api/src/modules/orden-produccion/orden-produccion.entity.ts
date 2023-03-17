import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alerta } from "../alerta/alerta.entity";
import { Color } from "../color/color.entity";
import { Empleado } from "../empleado/empleado.entity";
import { JornadaLaboral } from "../jornada-laboral/jornada-laboral.entity";
import { Linea } from "../linea/linea.entity";
import { Modelo } from "../modelo/modelo.entity";

enum Estado {
    INICIADA = "INICIADA",
    PAUSADA = "PAUSADA",
    FINALIZADA = "FINALIZADA"
 }

@Entity('ordenes-produccion')
export class OrdenProduccion extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_orden: number;

    @ManyToOne(() => Modelo, (modelo: Modelo) => modelo.ordenes, {eager: true})
    modelo: Modelo;

    @ManyToOne(() => Color, (color: Color) => color.ordenes, {eager: true})
    color: Color;

    @ManyToOne(() => Linea, (linea: Linea) => linea.ordenes, {eager: true})
    linea: Linea;

    @ManyToOne(() => Empleado, (empleado: Empleado) => empleado.ordenes, {eager: true})
    empleado: Empleado;

    @OneToMany(() => JornadaLaboral, (jornadas: JornadaLaboral) => jornadas.orden)
    jornadas: JornadaLaboral[];

    @OneToMany(() => Alerta, (alertas: Alerta) => alertas.orden)
    alertas: Alerta[];

    @Column({type: 'integer', nullable: false})
    numero: number;

    @Column({type: 'integer', nullable: false})
    inicio: number;

    @Column({type: 'integer', nullable: false})
    fin: number;
    
    @Column({type: 'text', nullable: true, default: 'INICIADA'})
    estado: Estado;


}