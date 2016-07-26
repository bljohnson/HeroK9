-- applications will have one to one relationships with inquiries and users but will have a one to many with K9s/handlers since applications table is for whole dept

CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(255) UNIQUE,
  password VARCHAR(255) UNIQUE,
	status INTEGER DEFAULT 0,
	created TIMESTAMP DEFAULT current_timestamp,
	form_id SERIAL UNIQUE
);

CREATE TABLE inquiries (
	id SERIAL PRIMARY KEY NOT NULL,
	rank VARCHAR(255),
	role VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	primary_phone VARCHAR(30),
	alt_phone VARCHAR(30),
	email VARCHAR(255) UNIQUE,
	contact_time VARCHAR(30),
	add_street1 VARCHAR(255),
	add_street2 VARCHAR(255),
	add_city VARCHAR(255),
	add_state VARCHAR(30),
	add_zip INTEGER,
	k9s INTEGER
);


CREATE TABLE K9s (
	id SERIAL PRIMARY KEY NOT NULL,
	application_id INTEGER, -- join with applications table id column

	k9_name VARCHAR (255),
	breed VARCHAR (255),
	age VARCHAR (30),
	certification TEXT[],
	active_duty BOOLEAN,
	k9_retirement BOOLEAN,

	rank VARCHAR(255),
	first_name VARCHAR (255),
	last_name VARCHAR (255),
	badge INTEGER,
	cell_phones VARCHAR(30),
	secondary_phone VARCHAR(30),
	email VARCHAR (255),
	equipment TEXT[],
	authorized BOOLEAN,
	terms BOOLEAN,

	certification_url VARCHAR (255),
	k9_photo_url TEXT[],
	k9_bio VARCHAR (5000),

	back INTEGER,
	chest INTEGER,
	girth INTEGER,
	undercarriage INTEGER,
	vest_color VARCHAR(30),
	vest_imprint VARCHAR(30),

	squad_make VARCHAR (50),
	squad_model VARCHAR (50),
	squad_year INTEGER,
	squad_photo_url TEXT[],
	squad_retirement BOOLEAN
);
