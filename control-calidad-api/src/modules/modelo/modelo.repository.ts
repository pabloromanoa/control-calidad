import { EntityRepository, Repository } from "typeorm";
import { Modelo } from "./modelo.entity";

@EntityRepository(Modelo)
export  class ModeloRepository extends Repository<Modelo>{}