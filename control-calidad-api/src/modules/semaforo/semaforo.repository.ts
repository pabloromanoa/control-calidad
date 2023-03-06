import { EntityRepository, Repository } from "typeorm";
import { Semaforo } from "./semaforo.entity";

@EntityRepository(Semaforo)
export  class SemaforoRepository extends Repository<Semaforo>{}