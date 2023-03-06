import { EntityRepository, Repository } from "typeorm";
import { Linea } from "./linea.entity";

@EntityRepository(Linea)
export  class LineaRepository extends Repository<Linea>{}