CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "pic" VARCHAR (255),
    "email" VARCHAR (50) NOT NULL,
    "phone_num" VARCHAR (25) NOT NULL
);



CREATE TABLE "category" (
	"id" SERIAL PRIMARY KEY,
	"type" varchar(50) NOT NULL
);

CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT NOT NULL,
	"posts_id" INT NOT NULL,
	"favorited" BOOLEAN DEFAULT TRUE
	);
	
	
CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(300) NOT NULL,
	"condition" varchar(20) NOT NULL,
	"image_url" VARCHAR(160) NOT NULL,
	"wants" VARCHAR(160) NOT NULL,
	"traded" BOOLEAN DEFAULT FALSE,
	"category_id" INT NOT NULL
	);

INSERT INTO category ("type")
        VALUES('Guitars'),('Pedals/Amplifiers'),('Keyboards/Synths'),('Recording'),('Drums'),('DJ/Audio'),('Band/Orchestra');

