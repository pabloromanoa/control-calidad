import { EntityRepository, Repository } from "typeorm";
import { RegistroDefecto } from "./registro-defecto.entity";

@EntityRepository(RegistroDefecto)
export  class RegistroDefectoRepository extends Repository<RegistroDefecto>{}