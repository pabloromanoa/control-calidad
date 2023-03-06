import { EntityRepository, Repository } from "typeorm";
import { Defecto } from "./defecto.entity";

@EntityRepository(Defecto)
export  class DefectoRepository extends Repository<Defecto>{}