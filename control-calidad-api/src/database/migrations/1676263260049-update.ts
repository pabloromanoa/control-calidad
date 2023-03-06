import {MigrationInterface, QueryRunner} from "typeorm";

export class update1676263260049 implements MigrationInterface {
    name = 'update1676263260049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alertas\` (\`id_alerta\` int NOT NULL AUTO_INCREMENT, \`fecha_limite\` timestamp NOT NULL, \`fecha_reinicio\` timestamp NOT NULL, \`tipo\` text NOT NULL, \`ordenIdOrden\` int NULL, PRIMARY KEY (\`id_alerta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`colores\` (\`id_color\` int NOT NULL AUTO_INCREMENT, \`codigo\` text NOT NULL, \`descripcion\` varchar(30) NOT NULL, PRIMARY KEY (\`id_color\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lineas\` (\`id_linea\` int NOT NULL AUTO_INCREMENT, \`numero\` int NOT NULL, \`descripcion\` varchar(30) NOT NULL, PRIMARY KEY (\`id_linea\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`modelos\` (\`id_modelo\` int NOT NULL AUTO_INCREMENT, \`sku\` text NOT NULL, \`descripcion\` text NOT NULL, \`limite_inferior_reproceso\` int NOT NULL, \`limite_superior_reproceso\` int NOT NULL, \`limite_inferior_observable\` int NOT NULL, \`limite_superior_observable\` int NOT NULL, PRIMARY KEY (\`id_modelo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ordenes-produccion\` (\`id_orden\` int NOT NULL AUTO_INCREMENT, \`numero\` int NOT NULL, \`inicio\` int NOT NULL, \`fin\` int NOT NULL, \`estado\` text NULL, \`modeloIdModelo\` int NULL, \`colorIdColor\` int NULL, \`lineaIdLinea\` int NULL, \`empleadoIdEmpleado\` int NULL, PRIMARY KEY (\`id_orden\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`defectos\` (\`id_defecto\` int NOT NULL AUTO_INCREMENT, \`descripcion\` text NOT NULL, \`tipo\` text NOT NULL, PRIMARY KEY (\`id_defecto\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`registros-defecto\` (\`id_registro\` int NOT NULL AUTO_INCREMENT, \`hora\` timestamp NOT NULL, \`pie\` text NOT NULL, \`jornadaIdJornada\` int NULL, \`defectoIdDefecto\` int NULL, PRIMARY KEY (\`id_registro\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`turnos\` (\`id_turno\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(30) NOT NULL, \`hora_inicio\` int NOT NULL, \`hora_fin\` int NOT NULL, \`jornadaIdJornada\` int NULL, PRIMARY KEY (\`id_turno\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jornadas-laboral\` (\`id_jornada\` int NOT NULL AUTO_INCREMENT, \`fecha_inicio\` timestamp NOT NULL, \`fecha_fin\` timestamp NOT NULL, \`total_primera\` int NOT NULL, \`total_segunda\` int NOT NULL, \`total_hermanado\` int NOT NULL, \`ordenIdOrden\` int NULL, PRIMARY KEY (\`id_jornada\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empleados\` (\`id_empleado\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(30) NOT NULL, \`apellido\` varchar(30) NOT NULL, \`dni\` text NOT NULL, \`mail\` text NOT NULL, \`jornadaIdJornada\` int NULL, \`turnoIdTurno\` int NULL, PRIMARY KEY (\`id_empleado\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id_rol\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id_rol\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`rolIdRol\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id_empleado\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_5d018987716778088f97f7574e\` (\`id_empleado\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5d018987716778088f97f7574e\` ON \`users\` (\`id_empleado\`)`);
        await queryRunner.query(`ALTER TABLE \`alertas\` ADD CONSTRAINT \`FK_ba6970954d132dd4c51178b3dfd\` FOREIGN KEY (\`ordenIdOrden\`) REFERENCES \`ordenes-produccion\`(\`id_orden\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` ADD CONSTRAINT \`FK_073efabbfb6f92faa5956e73b32\` FOREIGN KEY (\`modeloIdModelo\`) REFERENCES \`modelos\`(\`id_modelo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` ADD CONSTRAINT \`FK_62ae3f41eeadb6ad6482c70f088\` FOREIGN KEY (\`colorIdColor\`) REFERENCES \`colores\`(\`id_color\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` ADD CONSTRAINT \`FK_f5c383daf225b9d151799a53453\` FOREIGN KEY (\`lineaIdLinea\`) REFERENCES \`lineas\`(\`id_linea\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` ADD CONSTRAINT \`FK_835e402bf6f132bc7f44fda24a2\` FOREIGN KEY (\`empleadoIdEmpleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registros-defecto\` ADD CONSTRAINT \`FK_5ba8c4ade765a95429a06115052\` FOREIGN KEY (\`jornadaIdJornada\`) REFERENCES \`jornadas-laboral\`(\`id_jornada\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registros-defecto\` ADD CONSTRAINT \`FK_af1afb0f91a4d1395906d2bcd10\` FOREIGN KEY (\`defectoIdDefecto\`) REFERENCES \`defectos\`(\`id_defecto\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`turnos\` ADD CONSTRAINT \`FK_6e67758961a24ca89a0484ed469\` FOREIGN KEY (\`jornadaIdJornada\`) REFERENCES \`jornadas-laboral\`(\`id_jornada\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jornadas-laboral\` ADD CONSTRAINT \`FK_702d91adc519fce0006c07043e8\` FOREIGN KEY (\`ordenIdOrden\`) REFERENCES \`ordenes-produccion\`(\`id_orden\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`empleados\` ADD CONSTRAINT \`FK_7aab96e71b255d91b3fb22e834a\` FOREIGN KEY (\`jornadaIdJornada\`) REFERENCES \`jornadas-laboral\`(\`id_jornada\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`empleados\` ADD CONSTRAINT \`FK_8f500bca5712d6b74cea7e0eb4d\` FOREIGN KEY (\`turnoIdTurno\`) REFERENCES \`turnos\`(\`id_turno\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_ca9287cbd58206f14056ff94aea\` FOREIGN KEY (\`rolIdRol\`) REFERENCES \`roles\`(\`id_rol\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_5d018987716778088f97f7574e4\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_5d018987716778088f97f7574e4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_ca9287cbd58206f14056ff94aea\``);
        await queryRunner.query(`ALTER TABLE \`empleados\` DROP FOREIGN KEY \`FK_8f500bca5712d6b74cea7e0eb4d\``);
        await queryRunner.query(`ALTER TABLE \`empleados\` DROP FOREIGN KEY \`FK_7aab96e71b255d91b3fb22e834a\``);
        await queryRunner.query(`ALTER TABLE \`jornadas-laboral\` DROP FOREIGN KEY \`FK_702d91adc519fce0006c07043e8\``);
        await queryRunner.query(`ALTER TABLE \`turnos\` DROP FOREIGN KEY \`FK_6e67758961a24ca89a0484ed469\``);
        await queryRunner.query(`ALTER TABLE \`registros-defecto\` DROP FOREIGN KEY \`FK_af1afb0f91a4d1395906d2bcd10\``);
        await queryRunner.query(`ALTER TABLE \`registros-defecto\` DROP FOREIGN KEY \`FK_5ba8c4ade765a95429a06115052\``);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` DROP FOREIGN KEY \`FK_835e402bf6f132bc7f44fda24a2\``);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` DROP FOREIGN KEY \`FK_f5c383daf225b9d151799a53453\``);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` DROP FOREIGN KEY \`FK_62ae3f41eeadb6ad6482c70f088\``);
        await queryRunner.query(`ALTER TABLE \`ordenes-produccion\` DROP FOREIGN KEY \`FK_073efabbfb6f92faa5956e73b32\``);
        await queryRunner.query(`ALTER TABLE \`alertas\` DROP FOREIGN KEY \`FK_ba6970954d132dd4c51178b3dfd\``);
        await queryRunner.query(`DROP INDEX \`REL_5d018987716778088f97f7574e\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_5d018987716778088f97f7574e\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id_empleado\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`rolIdRol\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`empleados\``);
        await queryRunner.query(`DROP TABLE \`jornadas-laboral\``);
        await queryRunner.query(`DROP TABLE \`turnos\``);
        await queryRunner.query(`DROP TABLE \`registros-defecto\``);
        await queryRunner.query(`DROP TABLE \`defectos\``);
        await queryRunner.query(`DROP TABLE \`ordenes-produccion\``);
        await queryRunner.query(`DROP TABLE \`modelos\``);
        await queryRunner.query(`DROP TABLE \`lineas\``);
        await queryRunner.query(`DROP TABLE \`colores\``);
        await queryRunner.query(`DROP TABLE \`alertas\``);
    }

}
