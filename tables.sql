CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	contact_email VARCHAR(255) UNIQUE NOT NULL,
  	password VARCHAR(255) UNIQUE NOT NULL,
  	status VARCHAR(255) DEFAULT 'New Inquiry' NOT NULL,
	created TIMESTAMP DEFAULT current_timestamp NOT NULL,
	rank VARCHAR(255),
	role VARCHAR(255),
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	primary_phone VARCHAR(30) NOT NULL,
	alt_phone VARCHAR(30),
	contact_time VARCHAR(30) NOT NULL,
	add_street1 VARCHAR(255),
	add_street2 VARCHAR(255),
	add_city VARCHAR(255),
	add_state VARCHAR(30),
	add_zip INTEGER,
	dept_k9s INTEGER,
	auth_title VARCHAR(255),
	auth_first_name VARCHAR(255),
	auth_last_name VARCHAR(255),
	auth_phone VARCHAR(30),
	auth_email VARCHAR(255) UNIQUE
);

CREATE TABLE K9s (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id SERIAL UNIQUE NOT NULL,
	k9_name VARCHAR(255) NOT NULL,
	breed VARCHAR(255) NOT NULL,
	age VARCHAR(30) NOT NULL,
	k9_active_duty BOOLEAN NOT NULL,
	k9_retirement BOOLEAN NOT NULL,
	handler_rank VARCHAR(255) NOT NULL,
	handler_first_name VARCHAR(255) NOT NULL,
	handler_last_name VARCHAR(255) NOT NULL,
	handler_badge INTEGER NOT NULL,
	handler_cell_phone VARCHAR(30) NOT NULL,
	handler_secondary_phone VARCHAR(30),
	handler_email VARCHAR(255) NOT NULL,
	signed TIMESTAMP DEFAULT current_timestamp NOT NULL,
	k9_bio TEXT NOT NULL,
	k9_back INTEGER,
	k9_chest INTEGER,
	k9_girth INTEGER,
	k9_undercarriage INTEGER,
	k9_vest_color VARCHAR(30),
	k9_vest_imprint VARCHAR(30),
	squad_make VARCHAR(50),
	squad_model VARCHAR(50),
	squad_year INTEGER,
	squad_retirement BOOLEAN
);

CREATE TABLE certification_types (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	url VARCHAR(1000) NOT NULL
);

CREATE TABLE equipment (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE K9_photos (
	id SERIAL PRIMARY KEY NOT NULL,
	url VARCHAR(1000) NOT NULL,
	K9_id INTEGER NOT NULL
);

CREATE TABLE squad_photos (
	id SERIAL PRIMARY KEY NOT NULL,
	url VARCHAR(1000) NOT NULL,
	K9_id INTEGER NOT NULL
);

-- joins tables --
CREATE TABLE K9_certifications (
	id SERIAL PRIMARY KEY NOT NULL,
	K9_id INTEGER NOT NULL,
	certification_id INTEGER NOT NULL REFERENCES certification_types(id)
);

CREATE TABLE K9_equipment (
	id SERIAL PRIMARY KEY NOT NULL,
	K9_id INTEGER NOT NULL REFERENCES K9s(id),
	equipment_id INTEGER NOT NULL REFERENCES equipment(id)
);
