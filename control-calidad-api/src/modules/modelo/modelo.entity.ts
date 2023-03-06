import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdenProduccion } from "../orden-produccion/orden-produccion.entity";


@Entity('modelos')
export class Modelo extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_modelo: number;

    @OneToMany(() => OrdenProduccion, (ordenes: OrdenProduccion) => ordenes.modelo)
    ordenes: OrdenProduccion[];

    @Column({type: 'text', nullable: false})
    sku: string;

    @Column({type: 'text', nullable: false})
    descripcion: string;

    @Column({type: 'integer', nullable: false})
    limite_inferior_reproceso: number;

    @Column({type: 'integer', nullable: false})
    limite_superior_reproceso: number;

    @Column({type: 'integer', nullable: false})
    limite_inferior_observable: number;

    @Column({type: 'integer', nullable: false})
    limite_superior_observable: number;

}