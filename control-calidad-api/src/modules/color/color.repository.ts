import { EntityRepository, Repository } from "typeorm";
import { Color } from "./color.entity";

@EntityRepository(Color)
export  class ColorRepository extends Repository<Color>{}