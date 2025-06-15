--
-- PostgreSQL dump of the 'movies_db' database
--

-- Drop existing database if it exists and create a new one
-- You need to be connected to a different database (e.g., 'postgres') to drop 'movies_db'.
-- For a docker-entrypoint-initdb.d setup, you usually don't need the DROP DATABASE and CREATE DATABASE
-- statements within the script itself if the container handles database creation,
-- but if you're running it manually, you'd typically run these two lines separately
-- while connected to a different database (like 'postgres' or template1).
-- However, for a self-contained script, here's how it would generally be structured.

-- To handle the "cannot drop the currently open database" error when running this script:
-- 1. Connect to a different database (e.g., `psql -U postgres -d postgres`)
-- 2. Execute DROP DATABASE IF EXISTS movies_db;
-- 3. Execute CREATE DATABASE movies_db;
-- 4. Then connect to movies_db (`\c movies_db`) and run the rest of the script.

-- For simplicity in a single script that assumes you might run it after connecting to `movies_db`
-- or if the environment implicitly tries to drop and create, we can adjust.
-- The most common approach for init scripts in Docker is to let the entrypoint handle the database creation,
-- and then the script focuses on table creation and data insertion.

-- If running this script manually after connecting to the `movies_db` database:
-- You would need to remove or comment out the `DROP DATABASE` and `CREATE DATABASE` lines.
-- However, if the goal is a fully self-contained script, you'd typically drop the database
-- while connected to `postgres` or `template1` first, then connect to `movies_db` and run the rest.

-- Given the docker-entrypoint-initdb.d context where `movies_db` might be created by the entrypoint
-- and then the script is run while implicitly connected, the error `cannot drop the currently open database`
-- means the `DROP DATABASE` command is problematic here.
-- It's often better to skip dropping/creating the database *within* the script itself
-- if the Docker entrypoint handles the database creation.

-- Assuming the database `movies_db` is already created by the Docker entrypoint or you will create it manually:
-- We will start by dropping existing tables.

-- Drop tables in reverse order of dependency
DROP TABLE IF EXISTS "actor_episode" CASCADE;
DROP TABLE IF EXISTS "episodes" CASCADE;
DROP TABLE IF EXISTS "seasons" CASCADE;
DROP TABLE IF EXISTS "series" CASCADE;
DROP TABLE IF EXISTS "actor_movie" CASCADE;
DROP TABLE IF EXISTS "actors" CASCADE;
DROP TABLE IF EXISTS "movies" CASCADE;
DROP TABLE IF EXISTS "genres" CASCADE;
DROP TABLE IF EXISTS "password_resets" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "migrations" CASCADE;


--
-- Table structure for table `genres`
--

CREATE TABLE "genres" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "name" varchar(100) NOT NULL,
  "ranking" integer NOT NULL UNIQUE,
  "active" boolean NOT NULL DEFAULT TRUE
);

--
-- Dumping data for table `genres`
--

INSERT INTO "genres" ("created_at", "updated_at", "name", "ranking", "active") VALUES
('2016-07-04 03:00:00',NULL,'Comedia',1,TRUE),
('2014-07-04 03:00:00',NULL,'Terror',2,TRUE),
('2013-07-04 03:00:00',NULL,'Drama',3,TRUE),
('2011-07-04 03:00:00',NULL,'Accion',4,TRUE),
('2010-07-04 03:00:00',NULL,'Ciencia Ficcion',5,TRUE),
('2013-07-04 03:00:00',NULL,'Suspenso',6,TRUE),
('2005-07-04 03:00:00',NULL,'Animacion',7,TRUE),
('2003-07-04 03:00:00',NULL,'Aventuras',8,TRUE),
('2008-07-04 03:00:00',NULL,'Documental',9,TRUE),
('2013-07-04 03:00:00',NULL,'Infantiles',10,TRUE),
('2011-07-04 03:00:00',NULL,'Fantasia',11,TRUE),
('2013-07-04 03:00:00',NULL,'Musical',12,TRUE);

--
-- Table structure for table `movies`
--

CREATE TABLE "movies" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "title" varchar(500) NOT NULL,
  "rating" decimal(3,1) NOT NULL,
  "awards" integer NOT NULL DEFAULT 0,
  "release_date" timestamp NOT NULL,
  "length" integer DEFAULT NULL,
  "genre_id" integer DEFAULT NULL,
  CONSTRAINT "movies_genre_id_foreign" FOREIGN KEY ("genre_id") REFERENCES "genres" ("id")
);

--
-- Dumping data for table `movies`
--

INSERT INTO "movies" ("created_at", "updated_at", "title", "rating", "awards", "release_date", "length", "genre_id") VALUES
(NULL,NULL,'Avatar',7.9,3,'2010-10-04 00:00:00',120,5),
(NULL,NULL,'Titanic',7.7,11,'1997-09-04 00:00:00',320,3),
(NULL,NULL,'La Guerra de las galaxias: Episodio VI',9.1,7,'2004-07-04 00:00:00',NULL,5),
(NULL,NULL,'La Guerra de las galaxias: Episodio VII',9.0,6,'2003-11-04 00:00:00',180,5),
(NULL,NULL,'Parque Jurasico',8.3,5,'1999-01-04 00:00:00',270,5),
(NULL,NULL,'Harry Potter y las Reliquias de la Muerte - Parte 2',9.0,2,'2008-07-04 00:00:00',190,6),
(NULL,NULL,'Transformers: el lado oscuro de la luna',0.9,1,'2005-07-04 00:00:00',NULL,5),
(NULL,NULL,'Harry Potter y la piedra filosofal',10.0,1,'2008-04-04 00:00:00',120,8),
(NULL,NULL,'Harry Potter y la cámara de los secretos',3.5,2,'2009-08-04 00:00:00',200,8),
(NULL,NULL,'El rey león',9.1,3,'2000-02-04 00:00:00',NULL,10),
(NULL,NULL,'Alicia en el país de las maravillas',5.7,2,'2008-07-04 00:00:00',120,NULL),
(NULL,NULL,'Buscando a Nemo',8.3,2,'2000-07-04 00:00:00',110,7),
(NULL,NULL,'Toy Story',6.1,0,'2008-03-04 00:00:00',150,7),
(NULL,NULL,'Toy Story 2',3.2,2,'2003-04-04 00:00:00',120,7),
(NULL,NULL,'La vida es bella',8.3,5,'1994-10-04 00:00:00',NULL,3),
(NULL,NULL,'Mi pobre angelito',3.2,1,'1989-01-04 00:00:00',120,1),
(NULL,NULL,'Intensamente',9.0,2,'2008-07-04 00:00:00',120,7),
(NULL,NULL,'Carrozas de fuego',9.9,7,'1980-07-04 00:00:00',180,NULL),
(NULL,NULL,'Big',7.3,2,'1988-02-04 00:00:00',130,8),
(NULL,NULL,'I am Sam',9.0,4,'1999-03-04 00:00:00',130,3),
(NULL,NULL,'Hotel Transylvania',7.1,1,'2012-05-04 00:00:00',90,10);

--
-- Table structure for table `actors`
--

CREATE TABLE "actors" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "rating" decimal(3,1) DEFAULT NULL,
  "favorite_movie_id" integer DEFAULT NULL,
  CONSTRAINT "actors_favorite_movie_id_foreign" FOREIGN KEY ("favorite_movie_id") REFERENCES "movies" ("id")
);

--
-- Dumping data for table `actors`
--

INSERT INTO "actors" ("created_at", "updated_at", "first_name", "last_name", "rating", "favorite_movie_id") VALUES
(NULL,NULL,'Sam','Worthington',7.5,1),
(NULL,NULL,'Zoe','Saldana',5.5,2),
(NULL,NULL,'Sigourney','Weaver',9.7,NULL),
(NULL,NULL,'Leonardo','Di Caprio',3.5,4),
(NULL,NULL,'Kate','Winslet',1.5,5),
(NULL,NULL,'Billy','Zane',7.5,6),
(NULL,NULL,'Mark','Hamill',6.5,7),
(NULL,NULL,'Harrison','Ford',7.5,8),
(NULL,NULL,'Carrie','Fisher',7.5,9),
(NULL,NULL,'Sam','Neill',2.5,10),
(NULL,NULL,'Laura','Dern',7.5,11),
(NULL,NULL,'Jeff','Goldblum',4.5,NULL),
(NULL,NULL,'Daniel','Radcliffe',7.5,13),
(NULL,NULL,'Emma','Watson',2.5,14),
(NULL,NULL,'Rupert','Grint',6.2,15),
(NULL,NULL,'Shia','LaBeouf',9.5,16),
(NULL,NULL,'Rosie','Huntington-Whiteley',1.5,17),
(NULL,NULL,'Matthew','Broderick',6.1,18),
(NULL,NULL,'James','Earl Jones',7.5,19),
(NULL,NULL,'Jeremy','Irons',7.2,20),
(NULL,NULL,'Johnny','Depp',1.5,21),
(NULL,NULL,'Helena','Bonham Carter',7.5,1),
(NULL,NULL,'Mia','Wasikowska',7.5,2),
(NULL,NULL,'Albert','Brooks',2.5,3),
(NULL,NULL,'Ellen','DeGeneres',2.6,4),
(NULL,NULL,'Alexander','Gould',7.5,5),
(NULL,NULL,'Tom','Hanks',4.4,6),
(NULL,NULL,'Tim','Allen',7.5,7),
(NULL,NULL,'Sean','Penn',9.2,8),
(NULL,NULL,'Adam','Sandler',3.1,9),
(NULL,NULL,'Renee','Zellweger',9.5,10),
(NULL,NULL,'Emilia','Clarke',8.2,11),
(NULL,NULL,'Peter','Dinklage',2.3,12),
(NULL,NULL,'Kit','Harington',2.4,NULL),
(NULL,NULL,'Jared','Padalecki',2.8,14),
(NULL,NULL,'Jensen','Ackles',5.5,15),
(NULL,NULL,'Jim','Beaver',2.6,16),
(NULL,NULL,'Andrew','Lincoln',3.3,17),
(NULL,NULL,'Jon','Bernthal',2.9,NULL),
(NULL,NULL,'Sarah','Callies',2.4,19),
(NULL,NULL,'Jim','Caviezel',1.9,20),
(NULL,NULL,'Taraji','Henson',5.9,21),
(NULL,NULL,'Kevin','Chapman',2.9,1),
(NULL,NULL,'Johnny','Galecki',2.3,2),
(NULL,NULL,'Jim','Parsons',6.9,3),
(NULL,NULL,'Kaley','Cuoco',2.3,4),
(NULL,NULL,'Bryan','Cranston',7.9,NULL),
(NULL,NULL,'Aaron','Paul',5.9,6),
(NULL,NULL,'Anna','Gunn',3.1,7);

--
-- Table structure for table `actor_movie`
--

CREATE TABLE "actor_movie" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "actor_id" integer NOT NULL,
  "movie_id" integer NOT NULL,
  CONSTRAINT "actor_movie_actor_id_foreign" FOREIGN KEY ("actor_id") REFERENCES "actors" ("id"),
  CONSTRAINT "actor_movie_movie_id_foreign" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id")
);

--
-- Dumping data for table `actor_movie`
--

INSERT INTO "actor_movie" ("created_at", "updated_at", "actor_id", "movie_id") VALUES
(NULL,NULL,1,1),
(NULL,NULL,2,1),
(NULL,NULL,3,1),
(NULL,NULL,4,2),
(NULL,NULL,5,2),
(NULL,NULL,6,2),
(NULL,NULL,7,3),
(NULL,NULL,7,4),
(NULL,NULL,8,3),
(NULL,NULL,8,4),
(NULL,NULL,9,3),
(NULL,NULL,9,4),
(NULL,NULL,10,5),
(NULL,NULL,11,5),
(NULL,NULL,12,5),
(NULL,NULL,13,6),
(NULL,NULL,13,8),
(NULL,NULL,13,9),
(NULL,NULL,14,6),
(NULL,NULL,14,8),
(NULL,NULL,14,9),
(NULL,NULL,15,6),
(NULL,NULL,15,8),
(NULL,NULL,15,9),
(NULL,NULL,16,7),
(NULL,NULL,17,7),
(NULL,NULL,18,7),
(NULL,NULL,19,10),
(NULL,NULL,20,10),
(NULL,NULL,21,11),
(NULL,NULL,22,11),
(NULL,NULL,22,9),
(NULL,NULL,23,11),
(NULL,NULL,24,12),
(NULL,NULL,25,12),
(NULL,NULL,26,12),
(NULL,NULL,27,13),
(NULL,NULL,27,14),
(NULL,NULL,27,19),
(NULL,NULL,28,13),
(NULL,NULL,28,14),
(NULL,NULL,29,20),
(NULL,NULL,30,21);

--
-- Table structure for table `series`
--

CREATE TABLE "series" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "title" varchar(500) NOT NULL,
  "release_date" timestamp NOT NULL,
  "end_date" timestamp NOT NULL,
  "genre_id" integer DEFAULT NULL,
  CONSTRAINT "series_genre_id_foreign" FOREIGN KEY ("genre_id") REFERENCES "genres" ("id")
);

--
-- Dumping data for table `series`
--

INSERT INTO "series" ("created_at", "updated_at", "title", "release_date", "end_date", "genre_id") VALUES
(NULL,NULL,'Game of Thrones','2011-01-01 00:00:00','2016-03-04 00:00:00',11),
(NULL,NULL,'Supernatural','2005-01-01 00:00:00','2016-01-04 00:00:00',6),
(NULL,NULL,'The Walking Dead','2010-01-01 00:00:00','2016-01-04 00:00:00',2),
(NULL,NULL,'Person of Interest','2011-01-01 00:00:00','2015-01-04 00:00:00',4),
(NULL,NULL,'The Big Bang Theory','2007-01-01 00:00:00','2016-01-04 00:00:00',1),
(NULL,NULL,'Breaking Bad','2008-01-01 00:00:00','2013-01-04 00:00:00',3);

--
-- Table structure for table `seasons`
--

CREATE TABLE "seasons" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "title" varchar(500) DEFAULT NULL,
  "number" integer DEFAULT NULL,
  "release_date" timestamp NOT NULL,
  "end_date" timestamp NOT NULL,
  "serie_id" integer DEFAULT NULL,
  CONSTRAINT "seasons_serie_id_foreign" FOREIGN KEY ("serie_id") REFERENCES "series" ("id")
);

--
-- Dumping data for table `seasons`
--

INSERT INTO "seasons" ("created_at", "updated_at", "title", "number", "release_date", "end_date", "serie_id") VALUES
(NULL,NULL,'Primer Temporada',1,'2011-01-01 00:00:00','2011-01-01 00:00:00',1),
(NULL,NULL,'Segunda Temporada',2,'2012-01-01 00:00:00','2012-01-01 00:00:00',1),
(NULL,NULL,'Tercer Temporada',3,'2013-01-01 00:00:00','2013-01-01 00:00:00',1),
(NULL,NULL,'Cuarta Temporada',4,'2014-01-01 00:00:00','2014-01-01 00:00:00',1),
(NULL,NULL,'Quinta Temporada',5,'2015-01-01 00:00:00','2015-01-01 00:00:00',1),
(NULL,NULL,'Sexta Temporada',6,'2016-01-01 00:00:00','2016-01-01 00:00:00',1),
(NULL,NULL,'Septima Temporada',7,'2017-01-01 00:00:00','2017-01-01 00:00:00',1),
(NULL,NULL,'Primer Temporada',1,'2005-01-01 00:00:00','2006-01-01 00:00:00',2),
(NULL,NULL,'Segunda Temporada',2,'2006-01-01 00:00:00','2007-01-01 00:00:00',2),
(NULL,NULL,'Tercer Temporada',3,'2007-01-01 00:00:00','2008-01-01 00:00:00',2),
(NULL,NULL,'Cuarta Temporada',4,'2008-01-01 00:00:00','2009-01-01 00:00:00',2),
(NULL,NULL,'Quinta Temporada',5,'2009-01-01 00:00:00','2010-01-01 00:00:00',2),
(NULL,NULL,'Sexta Temporada',6,'2010-01-01 00:00:00','2011-01-01 00:00:00',2),
(NULL,NULL,'Septima Temporada',7,'2011-01-01 00:00:00','2012-01-01 00:00:00',2),
(NULL,NULL,'Octava Temporada',8,'2012-01-01 00:00:00','2013-01-01 00:00:00',2),
(NULL,NULL,'Novena Temporada',9,'2013-01-01 00:00:00','2014-01-01 00:00:00',2),
(NULL,NULL,'Decima Temporada',10,'2014-01-01 00:00:00','2015-01-01 00:00:00',2),
(NULL,NULL,'Undecima Temporada',11,'2015-01-01 00:00:00','2016-01-01 00:00:00',2),
(NULL,NULL,'Duodecima Temporada',12,'2016-01-01 00:00:00','2017-01-01 00:00:00',2),
(NULL,NULL,'Primer Temporada',1,'2010-01-01 00:00:00','2010-01-01 00:00:00',3),
(NULL,NULL,'Segunda Temporada',2,'2011-01-01 00:00:00','2012-01-01 00:00:00',3),
(NULL,NULL,'Tercer Temporada',3,'2012-01-01 00:00:00','2013-01-01 00:00:00',3),
(NULL,NULL,'Cuarta Temporada',4,'2013-01-01 00:00:00','2014-01-01 00:00:00',3),
(NULL,NULL,'Quinta Temporada',5,'2014-01-01 00:00:00','2015-01-01 00:00:00',3),
(NULL,NULL,'Sexta Temporada',6,'2015-01-01 00:00:00','2016-01-01 00:00:00',3),
(NULL,NULL,'Septima Temporada',7,'2016-01-01 00:00:00','2017-01-01 00:00:00',3),
(NULL,NULL,'Primer Temporada',1,'2011-01-01 00:00:00','2012-01-01 00:00:00',4),
(NULL,NULL,'Segunda Temporada',2,'2012-01-01 00:00:00','2013-01-01 00:00:00',4),
(NULL,NULL,'Tercer Temporada',3,'2013-01-01 00:00:00','2014-01-01 00:00:00',4),
(NULL,NULL,'Cuarta Temporada',4,'2014-01-01 00:00:00','2015-01-01 00:00:00',4),
(NULL,NULL,'Quinta Temporada',5,'2015-01-01 00:00:00','2016-01-01 00:00:00',4),
(NULL,NULL,'Primer Temporada',1,'2006-01-01 00:00:00','2008-01-01 00:00:00',5),
(NULL,NULL,'Segunda Temporada',2,'2008-01-01 00:00:00','2009-01-01 00:00:00',5),
(NULL,NULL,'Tercer Temporada',3,'2009-01-01 00:00:00','2010-01-01 00:00:00',5),
(NULL,NULL,'Cuarta Temporada',4,'2010-01-01 00:00:00','2011-01-01 00:00:00',5),
(NULL,NULL,'Quinta Temporada',5,'2011-01-01 00:00:00','2012-01-01 00:00:00',5),
(NULL,NULL,'Sexta Temporada',6,'2012-01-01 00:00:00','2013-01-01 00:00:00',5),
(NULL,NULL,'Septima Temporada',7,'2013-01-01 00:00:00','2014-01-01 00:00:00',5),
(NULL,NULL,'Octava Temporada',8,'2014-01-01 00:00:00','2015-01-01 00:00:00',5),
(NULL,NULL,'Novena Temporada',9,'2015-01-01 00:00:00','2016-01-01 00:00:00',5),
(NULL,NULL,'Decima Temporada',10,'2016-01-01 00:00:00','2017-01-01 00:00:00',5),
(NULL,NULL,'Primer Temporada',1,'2008-01-01 00:00:00','2008-01-01 00:00:00',6),
(NULL,NULL,'Segunda Temporada',2,'2009-01-01 00:00:00','2009-01-01 00:00:00',6),
(NULL,NULL,'Tercer Temporada',3,'2010-01-01 00:00:00','2010-01-01 00:00:00',6),
(NULL,NULL,'Cuarta Temporada',4,'2011-01-01 00:00:00','2011-01-01 00:00:00',6),
(NULL,NULL,'Quinta Temporada',5,'2012-01-01 00:00:00','2012-01-01 00:00:00',6);

--
-- Table structure for table `episodes`
--

CREATE TABLE "episodes" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "title" varchar(500) DEFAULT NULL,
  "number" integer DEFAULT NULL,
  "release_date" timestamp NOT NULL,
  "rating" decimal(3,1) NOT NULL,
  "season_id" integer DEFAULT NULL,
  CONSTRAINT "episodes_season_id_foreign" FOREIGN KEY ("season_id") REFERENCES "seasons" ("id")
);

--
-- Dumping data for table `episodes`
--

INSERT INTO "episodes" ("created_at", "updated_at", "title", "number", "release_date", "rating", "season_id") VALUES
(NULL,NULL,'Winter Is Coming',1,'2011-01-01 00:00:00',7.3,1),
(NULL,NULL,'The North Remembers',1,'2012-01-01 00:00:00',8.3,2),
(NULL,NULL,'Valar Dohaeris',1,'2013-01-01 00:00:00',6.3,3),
(NULL,NULL,'Two Swords',1,'2014-01-01 00:00:00',7.5,4),
(NULL,NULL,'The Wars to Come',1,'2015-01-01 00:00:00',9.3,5),
(NULL,NULL,'The Red Woman',1,'2016-01-01 00:00:00',7.7,6),
(NULL,NULL,'Pilot',1,'2005-01-01 00:00:00',7.3,8),
(NULL,NULL,'In My Time of Dying',1,'2006-01-01 00:00:00',8.3,9),
(NULL,NULL,'The Magnificent Seven',1,'2007-01-01 00:00:00',6.3,10),
(NULL,NULL,'Lazarus Rising',1,'2008-01-01 00:00:00',7.5,11),
(NULL,NULL,'Sympathy for the Devil',1,'2009-01-01 00:00:00',9.3,12),
(NULL,NULL,'Exile on Main St.',1,'2010-01-01 00:00:00',7.7,13),
(NULL,NULL,'Meet the New Boss',1,'2011-01-01 00:00:00',7.3,14),
(NULL,NULL,'We Need to Talk About Kevin',1,'2012-01-01 00:00:00',8.3,15),
(NULL,NULL,'I Think Im Gonna Like It Here',1,'2013-01-01 00:00:00',6.3,16),
(NULL,NULL,'A Very Special Supernatural Special',1,'2014-01-01 00:00:00',7.5,17),
(NULL,NULL,'Out of the Darkness, Into the Fire',1,'2015-01-01 00:00:00',9.3,18),
(NULL,NULL,'Days Gone Bye',1,'2010-01-01 00:00:00',7.3,20),
(NULL,NULL,'What Lies Ahead',1,'2011-01-01 00:00:00',8.3,21),
(NULL,NULL,'Seed',1,'2012-01-01 00:00:00',6.3,22),
(NULL,NULL,'30 Days Without an Accident',1,'2013-01-01 00:00:00',7.5,23),
(NULL,NULL,'No Sanctuary',1,'2014-01-01 00:00:00',9.3,24),
(NULL,NULL,'First Time Again',1,'2015-01-01 00:00:00',7.7,25),
(NULL,NULL,'Pilot',1,'2011-01-01 00:00:00',7.3,27),
(NULL,NULL,'The Contingency',1,'2012-01-01 00:00:00',8.3,28),
(NULL,NULL,'Liberty',1,'2013-01-01 00:00:00',6.3,29),
(NULL,NULL,'Panopticon',1,'2015-01-01 00:00:00',7.5,30),
(NULL,NULL,'B.S.O.D.',1,'2016-01-01 00:00:00',9.3,31),
(NULL,NULL,'Pilot',1,'2005-01-01 00:00:00',7.3,32),
(NULL,NULL,'The Bad Fish Paradigm',1,'2006-01-01 00:00:00',8.3,33),
(NULL,NULL,'The Electric Can Opener Fluctuation',1,'2007-01-01 00:00:00',6.3,34),
(NULL,NULL,'The Robotic Manipulation',1,'2008-01-01 00:00:00',7.5,35),
(NULL,NULL,'The Skank Reflex Analysis',1,'2009-01-01 00:00:00',9.3,36),
(NULL,NULL,'The Date Night Variable',1,'2010-01-01 00:00:00',7.7,37),
(NULL,NULL,'The Hofstadter Insufficiency',1,'2011-01-01 00:00:00',7.3,38),
(NULL,NULL,'The Locomotion Interruption',1,'2012-01-01 00:00:00',8.3,39),
(NULL,NULL,'The Matrimonial Momentum',1,'2013-01-01 00:00:00',6.3,40),
(NULL,NULL,'Pilot',1,'2009-01-01 00:00:00',7.3,42),
(NULL,NULL,'Seven Thirty-Seven',1,'2010-01-01 00:00:00',8.3,43),
(NULL,NULL,'No Más',1,'2011-01-01 00:00:00',6.3,44),
(NULL,NULL,'Box Cutter',1,'2012-01-01 00:00:00',7.5,45),
(NULL,NULL,'Live Free or Die',1,'2013-01-01 00:00:00',9.3,46),
(NULL,NULL,'Madrigal',2,'2013-02-01 00:00:00',9.3,46),
(NULL,NULL,'Hazard Pay',3,'2013-03-01 00:00:00',9.3,46),
(NULL,NULL,'Fifty-One',4,'2013-04-01 00:00:00',9.3,46),
(NULL,NULL,'Dead Freight',5,'2013-05-01 00:00:00',9.3,46),
(NULL,NULL,'Buyout',6,'2013-06-01 00:00:00',9.3,46),
(NULL,NULL,'Say My Name',7,'2013-06-01 00:00:00',9.3,46),
(NULL,NULL,'Gliding Over All',8,'2013-07-01 00:00:00',9.3,46),
(NULL,NULL,'Blood Money',9,'2013-07-01 00:00:00',9.3,46),
(NULL,NULL,'Buried',10,'2013-07-01 00:00:00',9.3,46),
(NULL,NULL,'Confessions',11,'2013-08-01 00:00:00',9.3,46),
(NULL,NULL,'Rabid Dog',12,'2013-09-01 00:00:00',9.3,46),
(NULL,NULL,'To hajiilee',13,'2013-10-01 00:00:00',9.3,46),
(NULL,NULL,'Ozymandias',14,'2013-11-01 00:00:00',9.3,46),
(NULL,NULL,'Granite State',15,'2013-12-01 00:00:00',9.3,46),
(NULL,NULL,'Felina',16,'2013-12-01 00:00:00',9.3,46);

--
-- Table structure for table `actor_episode`
--

CREATE TABLE "actor_episode" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL,
  "actor_id" integer NOT NULL,
  "episode_id" integer NOT NULL,
  CONSTRAINT "actor_episode_actor_id_foreign" FOREIGN KEY ("actor_id") REFERENCES "actors" ("id"),
  CONSTRAINT "actor_episode_episode_id_foreign" FOREIGN KEY ("episode_id") REFERENCES "episodes" ("id")
);

--
-- Dumping data for table `actor_episode`
--

INSERT INTO "actor_episode" ("created_at", "updated_at", "actor_id", "episode_id") VALUES
(NULL,NULL,32,1),
(NULL,NULL,32,2),
(NULL,NULL,32,3),
(NULL,NULL,32,4),
(NULL,NULL,32,5),
(NULL,NULL,33,1),
(NULL,NULL,33,2),
(NULL,NULL,33,3),
(NULL,NULL,33,4),
(NULL,NULL,33,5),
(NULL,NULL,33,6),
(NULL,NULL,34,1),
(NULL,NULL,34,2),
(NULL,NULL,34,4),
(NULL,NULL,34,5),
(NULL,NULL,34,6),
(NULL,NULL,35,7),
(NULL,NULL,35,8),
(NULL,NULL,35,9),
(NULL,NULL,35,10),
(NULL,NULL,35,11),
(NULL,NULL,35,12),
(NULL,NULL,35,13),
(NULL,NULL,35,15),
(NULL,NULL,35,16),
(NULL,NULL,35,17),
(NULL,NULL,36,7),
(NULL,NULL,36,8),
(NULL,NULL,36,9),
(NULL,NULL,36,10),
(NULL,NULL,36,13),
(NULL,NULL,36,14),
(NULL,NULL,36,15),
(NULL,NULL,36,16),
(NULL,NULL,36,17),
(NULL,NULL,37,7),
(NULL,NULL,37,8),
(NULL,NULL,37,9),
(NULL,NULL,37,10),
(NULL,NULL,37,11),
(NULL,NULL,37,12),
(NULL,NULL,37,13),
(NULL,NULL,37,14),
(NULL,NULL,37,15),
(NULL,NULL,37,17),
(NULL,NULL,38,18),
(NULL,NULL,38,19),
(NULL,NULL,38,20),
(NULL,NULL,38,22),
(NULL,NULL,38,23),
(NULL,NULL,39,18),
(NULL,NULL,39,19),
(NULL,NULL,39,20),
(NULL,NULL,39,21),
(NULL,NULL,39,22),
(NULL,NULL,39,23),
(NULL,NULL,40,19),
(NULL,NULL,40,20),
(NULL,NULL,40,21),
(NULL,NULL,40,22),
(NULL,NULL,40,23),
(NULL,NULL,41,24),
(NULL,NULL,41,25),
(NULL,NULL,41,26),
(NULL,NULL,41,27),
(NULL,NULL,41,28),
(NULL,NULL,42,24),
(NULL,NULL,42,25),
(NULL,NULL,42,26),
(NULL,NULL,42,27),
(NULL,NULL,42,28),
(NULL,NULL,43,24),
(NULL,NULL,43,26),
(NULL,NULL,43,27),
(NULL,NULL,43,28),
(NULL,NULL,44,29),
(NULL,NULL,44,30),
(NULL,NULL,44,31),
(NULL,NULL,44,32),
(NULL,NULL,44,33),
(NULL,NULL,44,34),
(NULL,NULL,44,35),
(NULL,NULL,44,36),
(NULL,NULL,44,37),
(NULL,NULL,45,29),
(NULL,NULL,45,31),
(NULL,NULL,45,32),
(NULL,NULL,45,33),
(NULL,NULL,45,34),
(NULL,NULL,45,35),
(NULL,NULL,45,36),
(NULL,NULL,45,37),
(NULL,NULL,46,29),
(NULL,NULL,46,30),
(NULL,NULL,46,33),
(NULL,NULL,46,35),
(NULL,NULL,46,36),
(NULL,NULL,46,37),
(NULL,NULL,47,38),
(NULL,NULL,47,39),
(NULL,NULL,47,40),
(NULL,NULL,47,41),
(NULL,NULL,47,42),
(NULL,NULL,47,45),
(NULL,NULL,47,46),
(NULL,NULL,47,47),
(NULL,NULL,47,48),
(NULL,NULL,47,49),
(NULL,NULL,47,50),
(NULL,NULL,47,51),
(NULL,NULL,47,52),
(NULL,NULL,47,53),
(NULL,NULL,47,54),
(NULL,NULL,47,55),
(NULL,NULL,47,56),
(NULL,NULL,48,40),
(NULL,NULL,48,41),
(NULL,NULL,48,42),
(NULL,NULL,48,43),
(NULL,NULL,48,44),
(NULL,NULL,48,45),
(NULL,NULL,48,47),
(NULL,NULL,48,48),
(NULL,NULL,48,49),
(NULL,NULL,48,50),
(NULL,NULL,48,51),
(NULL,NULL,48,52),
(NULL,NULL,48,54),
(NULL,NULL,48,55),
(NULL,NULL,48,56),
(NULL,NULL,48,57),
(NULL,NULL,49,38),
(NULL,NULL,49,39),
(NULL,NULL,49,40),
(NULL,NULL,49,41),
(NULL,NULL,49,42),
(NULL,NULL,49,43),
(NULL,NULL,49,44),
(NULL,NULL,49,46),
(NULL,NULL,49,47),
(NULL,NULL,49,48),
(NULL,NULL,49,49),
(NULL,NULL,49,50),
(NULL,NULL,49,51),
(NULL,NULL,49,52),
(NULL,NULL,49,54),
(NULL,NULL,49,55),
(NULL,NULL,49,57);

--
-- Table structure for table `migrations`
--

CREATE TABLE "migrations" (
  "id" SERIAL PRIMARY KEY,
  "migration" varchar(255) NOT NULL,
  "batch" integer NOT NULL
);

--
-- Dumping data for table `migrations`
--

INSERT INTO "migrations" ("migration", "batch") VALUES
('2014_10_12_000000_create_users_table',1),
('2014_10_12_100000_create_password_resets_table',1),
('2016_10_17_130820_create_genres_table',1),
('2016_10_17_130829_create_movies_table',1),
('2016_10_17_130842_create_series_table',1),
('2016_10_17_130849_create_seasons_table',1),
('2016_10_17_130903_create_episodes_table',1),
('2016_10_17_130913_create_actors_table',1),
('2016_10_17_130925_create_actor_movie_table',1),
('2016_10_17_130938_create_actor_episode_table',1);

--
-- Table structure for table `password_resets`
--

CREATE TABLE "password_resets" (
  "email" varchar(255) NOT NULL,
  "token" varchar(255) NOT NULL,
  "created_at" timestamp NULL DEFAULT NULL
);

CREATE INDEX password_resets_email_index ON "password_resets" ("email");
CREATE INDEX password_resets_token_index ON "password_resets" ("token");

--
-- Table structure for table `users`
--

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "remember_token" varchar(100) DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT NULL
);