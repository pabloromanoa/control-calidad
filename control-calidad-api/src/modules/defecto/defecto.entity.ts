import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RegistroDefecto } from "../registro-defecto/registro-defecto.entity";

enum Tipo {
    observado = "observado",
    reproceso = "reproceso",
 }

@Entity('defectos')
export class Defecto extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_defecto: number;

    @OneToMany(() => RegistroDefecto, (registros: RegistroDefecto) => registros.defecto)
    registros: RegistroDefecto[];

    @Column({type: 'text', nullable: false})
    descripcion: string;

    @Column({type: 'text', nullable: false})
    tipo: Tipo;

}