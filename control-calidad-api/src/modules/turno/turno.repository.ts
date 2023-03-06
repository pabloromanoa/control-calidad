import { EntityRepository, Repository } from "typeorm";
import { Turno } from "./turno.entity";

@EntityRepository(Turno)
export  class TurnoRepository extends Repository<Turno>{}