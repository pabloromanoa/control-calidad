import { EntityRepository, Repository } from "typeorm";
import { Empleado } from "./empleado.entity";

@EntityRepository(Empleado)
export  class EmpleadoRepository extends Repository<Empleado>{}