CREATE TYPE status AS ENUM ('New Inquiry', 'Pending Inquiry', 'Approved Inquiry', 'New Application', 'Pending Application', 'Approved Application', 'Admin');
CREATE TYPE role AS ENUM ('K9 Handler', 'K9 Unit Supervisor', 'Department Admin', 'Other Admin Staff', 'Other Command Staff');

-- this table takes in data from either basic or full form. not every user will be associated with a k9/handler, when not auth signer --
CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	contact_email VARCHAR(255) UNIQUE NOT NULL,
  	password VARCHAR(255) UNIQUE NOT NULL,
  	status STATUS DEFAULT 'New Inquiry' NOT NULL,
	created TIMESTAMP DEFAULT current_timestamp NOT NULL,
	rank VARCHAR(255),
	role ROLE,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	primary_phone VARCHAR(30) NOT NULL,
	alt_phone VARCHAR(30),
	contact_time VARCHAR(30) NOT NULL,
	dept_add_street1 VARCHAR(255),
	dept_add_street2 VARCHAR(255),
	dept_add_city VARCHAR(255),
	dept_add_state VARCHAR(30),
	dept_add_zip INTEGER,
	dept_k9s INTEGER,
	auth_title VARCHAR(255),
	auth_first_name VARCHAR(255),
	auth_last_name VARCHAR(255),
	auth_phone VARCHAR(30),
	auth_email VARCHAR(255) UNIQUE
);

CREATE TABLE K9s (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id),
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
-- user will have ability to save the below data and return later to complete form, thus made nullable --
	k9_bio TEXT,
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

CREATE TABLE certifications (
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
	K9_id INTEGER NOT NULL REFERENCES K9s(id)
);

CREATE TABLE squad_photos (
	id SERIAL PRIMARY KEY NOT NULL,
	url VARCHAR(1000) NOT NULL,
	K9_id INTEGER NOT NULL REFERENCES K9s(id)
);

-- junction tables for many to many joins --
CREATE TABLE K9s_certifications (
	id SERIAL PRIMARY KEY NOT NULL,
	K9_id INTEGER NOT NULL,
	certification_id INTEGER NOT NULL REFERENCES certifications(id)
);

CREATE TABLE K9s_equipment (
	id SERIAL PRIMARY KEY NOT NULL,
	K9_id INTEGER NOT NULL REFERENCES K9s(id),
	equipment_id INTEGER NOT NULL REFERENCES equipment(id)
);
