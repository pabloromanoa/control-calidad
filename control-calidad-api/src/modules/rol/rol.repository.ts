import { EntityRepository, Repository } from "typeorm";
import { Rol } from "./rol.entity";

@EntityRepository(Rol)
export  class RolRepository extends Repository<Rol>{}