import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";


@Entity('lineas')
export class Linea extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_linea: number;

    @OneToMany(() => OrdenProduccion, (ordenes: OrdenProduccion) => ordenes.linea)
    ordenes: OrdenProduccion[];

    @Column({type: 'integer', nullable: false})
    numero: number;

    @Column({type: 'varchar', length: 30, nullable: false})
    descripcion: string;

}