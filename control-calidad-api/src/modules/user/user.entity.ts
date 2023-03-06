import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empleado } from "../empleado/empleado.entity";
import { Rol } from "../rol/rol.entity";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Rol, (rol: Rol) => rol.users,{eager: true})
    rol: Rol;

    @OneToOne(()=>Empleado, {cascade: true, nullable: false, eager: true})
    @JoinColumn({name: 'id_empleado'})
    empleado: Empleado;

    @Column({type: 'varchar', unique: true, length: 25, nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;
}