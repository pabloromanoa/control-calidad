import { EntityRepository, Repository } from "typeorm";
import { OrdenProduccion } from "./orden-produccion.entity";

@EntityRepository(OrdenProduccion)
export  class OrdenProduccionRepository extends Repository<OrdenProduccion>{}