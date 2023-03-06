import { EntityRepository, Repository } from "typeorm";
import { JornadaLaboral } from "./jornada-laboral.entity";

@EntityRepository(JornadaLaboral)
export  class JornadaLaboralRepository extends Repository<JornadaLaboral>{}