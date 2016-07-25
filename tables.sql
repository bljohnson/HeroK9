CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(255) UNIQUE,
  	password VARCHAR(255) UNIQUE,
	active BOOLEAN,
	admin BOOLEAN,
  	applicationID INTEGER,
	created TIMESTAMP DEFAULT current_timestamp
);

-- application will have a one to one relationship with inquiries and users,
-- but will have a one to many with K9s
CREATE TABLE applications (
	id SERIAL PRIMARY KEY NOT NULL,
  	inquiry_id INTEGER, --not unique bc use to join with inquiry table id
  	user_id INTEGER, --not unique bc use to join with users table

);

CREATE TABLE inquiries (
	id SERIAL PRIMARY KEY NOT NULL,
	auth BOOLEAN, -- if true, join with applications table inquiry id; based on if check Yes or No
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
	k9s INTEGER,
	-- the following columns will only be saved to db to populate inquiry table on admin dashboard. won't be used to prepopulate any form fields for application, since if unauth person fills out inquiry form, auth signer will have to go back and fill out full form (via link from admin)
	auth_title VARCHAR(255),
	auth_first_name VARCHAR(255),
	auth_last_name VARCHAR(255),
	auth_phone VARCHAR(30),
	auth_email VARCHAR(255) UNIQUE
);



CREATE TABLE K9 (
	id SERIAL PRIMARY KEY NOT NULL,
	applicationID INTEGER,

);
