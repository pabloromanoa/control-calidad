import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Defecto } from "../defecto/defecto.entity";
import { JornadaLaboral } from "../jornada-laboral/jornada-laboral.entity";

enum Pie {
    IZQUIERDO = "IZQUIERDO",
    DERECHO = "DERECHO",
 }

@Entity('registros-defecto')
export class RegistroDefecto extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id_registro: number;

    @ManyToOne(() => JornadaLaboral, (jornada: JornadaLaboral) => jornada.registros, {eager: true})
    jornada: JornadaLaboral;

    @ManyToOne(() => Defecto, (defecto: Defecto) => defecto.registros, {eager: true})
    defecto: Defecto;

    @Column({type: 'timestamp', nullable: false})
    hora: Date;

    @Column({type: 'text', nullable: false})
    pie: Pie;

}