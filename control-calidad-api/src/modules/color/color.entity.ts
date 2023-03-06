import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";


@Entity('colores')
export class Color extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_color: number;

    @OneToMany(() => OrdenProduccion, (ordenes: OrdenProduccion) => ordenes.color)
    ordenes: OrdenProduccion[];

    @Column({type: 'text', nullable: false})
    codigo: string;

    @Column({type: 'varchar', length: 30, nullable: false})
    descripcion: string;

}