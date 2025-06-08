-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sistema_administrador_ndt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sistema_administrador_ndt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sistema_administrador_ndt` DEFAULT CHARACTER SET utf8 ;
USE `sistema_administrador_ndt` ;

-- -----------------------------------------------------
-- Table `sistema_administrador_ndt`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_administrador_ndt`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema_administrador_ndt`.`notas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_administrador_ndt`.`notas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `create_at` DATETIME NOT NULL,
  `last_modification` DATETIME NOT NULL,
  `eliminate` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_notas_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_notas`
    FOREIGN KEY (`id_user`)
    REFERENCES `sistema_administrador_ndt`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema_administrador_ndt`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_administrador_ndt`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema_administrador_ndt`.`notas_gategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_administrador_ndt`.`notas_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_notas` INT NOT NULL,
  `id_categories` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notascategories_notas_idx` (`id_notas` ASC) VISIBLE,
  CONSTRAINT `fk_notascategories_notas`
    FOREIGN KEY (`id_notas`)
    REFERENCES `sistema_administrador_ndt`.`notas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notascategories_categories`
    FOREIGN KEY (`id_categories`)
    REFERENCES `sistema_administrador_ndt`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Datos para tabla usuarios
INSERT INTO usuarios (name, email) VALUE('Nombre1', 'usuario1@gmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre2', 'usuario2@gmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre3', 'usuario3@yahoo.com');
INSERT INTO usuarios (name, email) VALUE('Nombre4', 'usuario4@hotmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre5', 'usuario5@hotmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre6', 'usuario6@gmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre7', 'usuario7@gmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre8', 'usuario8@hotmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre9', 'usuario9@gmail.com');
INSERT INTO usuarios (name, email) VALUE('Nombre10', 'usuario10@yahoo.com');


-- Datos para tabla notas
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(1,'Nota1', 'Descripción nota1',now(),now(),0);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(1,'Nota2', 'Descripción nota2',now(),now(),0);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(3,'Nota3', 'Descripción nota3',now(),now(),1);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(4,'Nota4', 'Descripción nota4',now(),now(),1);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(4,'Nota5', 'Descripción nota5',now(),now(),1);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(4,'Nota6', 'Descripción nota6',now(),now(),0);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(5,'Nota7', 'Descripción nota7',now(),now(),1);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(5,'Nota8', 'Descripción nota8',now(),now(),0);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(7,'Nota9', 'Descripción nota9',now(),now(),1);
INSERT INTO notas (id_user,title,description,create_at,last_modification,eliminate) VALUE(9,'Nota10', 'Descripción nota10',now(),now(),1);

-- Datos para tablas categorias
INSERT INTO categories (name) VALUE('Categoría 1');
INSERT INTO categories (name) VALUE('Categoría 2');
INSERT INTO categories (name) VALUE('Categoría 3');
INSERT INTO categories (name) VALUE('Categoría 4');
INSERT INTO categories (name) VALUE('Categoría 5');
INSERT INTO categories (name) VALUE('Categoría 6');
INSERT INTO categories (name) VALUE('Categoría 7');
INSERT INTO categories (name) VALUE('Categoría 8');
INSERT INTO categories (name) VALUE('Categoría 9');
INSERT INTO categories (name) VALUE('Categoría 10');

-- Datos para tablas notas_categories

INSERT INTO notas_categories (id_notas, id_categories) VALUE(1, 1);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(1, 2);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(1, 3);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(1, 4);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(2, 1);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(3, 8);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(5, 1);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(5, 10);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(5, 7);
INSERT INTO notas_categories (id_notas, id_categories) VALUE(6, 9);