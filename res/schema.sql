-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema con_cars
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema con_cars
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `con_cars` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `con_cars` ;

-- -----------------------------------------------------
-- Table `con_cars`.`families`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `con_cars`.`families` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `con_cars`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `con_cars`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `family_id` INT UNSIGNED NULL,
  `email` VARCHAR(254) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_families1_idx` (`family_id` ASC),
  CONSTRAINT `fk_users_families1`
    FOREIGN KEY (`family_id`)
    REFERENCES `con_cars`.`families` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `con_cars`.`cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `con_cars`.`cars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(254) NOT NULL,
  `construction_year` YEAR NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cars_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_cars_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `con_cars`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER 'con_cars_portal' IDENTIFIED BY 'red340KHI($_';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `con_cars`.* TO 'con_cars_portal';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
