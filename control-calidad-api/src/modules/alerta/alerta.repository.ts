import { EntityRepository, Repository } from "typeorm";
import { Alerta } from "./alerta.entity";

@EntityRepository(Alerta)
export  class AlertaRepository extends Repository<Alerta>{}