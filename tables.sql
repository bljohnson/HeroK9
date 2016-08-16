CREATE TYPE role AS ENUM ('K9 Handler', 'K9 Unit Supervisor', 'Department Admin', 'Other Admin Staff', 'Other Command Staff');

CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(255) UNIQUE,
	contact_email VARCHAR(255) UNIQUE NOT NULL,
  	password VARCHAR(255) UNIQUE,
  	status_id INTEGER DEFAULT '1' NOT NULL REFERENCES status(id),
	created TIMESTAMP DEFAULT current_timestamp NOT NULL,
	rank VARCHAR(255),
	role ROLE,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	primary_phone VARCHAR(30),
	alt_phone VARCHAR(30),
	contact_time VARCHAR(30),
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
	auth_email VARCHAR(255) UNIQUE,
	notes TEXT,
	signature VARCHAR(30),
	badge INTEGER
);

CREATE TABLE status (
	id SERIAL PRIMARY KEY NOT NULL,
	status_type VARCHAR (30),
	description VARCHAR (255)
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY NOT NULL,
	message VARCHAR (1020),
	subject VARCHAR (255),
	username VARCHAR(30),
	messagetime TIMESTAMP DEFAULT current_timestamp NOT NULL
);

CREATE TYPE vest_color AS ENUM ('Black', 'Multi-Cam®', 'Ranger Green', 'Tan');
CREATE TYPE vest_imprint AS ENUM ('Fire', 'Fire K9', 'Police', 'Police K9', 'Search and Rescue', 'Sheriff', 'Sheriff K9');
CREATE TYPE vest_imprint_color AS ENUM ('Dark Gray', 'Reflective Silver', 'White', 'Yellow');

CREATE TABLE K9s (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id),
	k9_name VARCHAR(255) NOT NULL,
	breed VARCHAR(255) NOT NULL,
	age VARCHAR(30) NOT NULL,
	k9_certified BOOLEAN NOT NULL,
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
-- user will have ability to save the below data and return later to complete form --
	k9_bio TEXT,
	k9_back INTEGER,
	k9_chest INTEGER,
	k9_girth INTEGER,
	k9_undercarriage INTEGER,
	k9_vest_color VEST_COLOR,
	k9_vest_imprint VEST_IMPRINT,
	k9_vest_imprint_color VEST_IMPRINT_COLOR,
	squad_make VARCHAR(50),
	squad_model VARCHAR(50),
	squad_year INTEGER,
	squad_retirement BOOLEAN
);

CREATE TYPE certification AS ENUM ('Explosives', 'Narcotics', 'Patrol', 'Tracking/Trailing');

CREATE TABLE certifications (
	id SERIAL PRIMARY KEY NOT NULL,
	name CERTIFICATION NOT NULL
);

CREATE TYPE offering AS ENUM ('In-squad kennel', 'Ballistic vest', 'Multi-threat vest', 'Door pop/heat alarm');

CREATE TABLE equipment (
	id SERIAL PRIMARY KEY NOT NULL,
	name OFFERING NOT NULL
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


-- junction tables --
CREATE TABLE K9s_certifications (
	id SERIAL PRIMARY KEY NOT NULL,
	K9_id INTEGER NOT NULL,
	certification_id INTEGER NOT NULL REFERENCES certifications(id),
	url VARCHAR(1000) NOT NULL,
	notes VARCHAR(500)
);

CREATE TABLE K9s_equipment (
	id SERIAL PRIMARY KEY NOT NULL,
	K9_id INTEGER NOT NULL REFERENCES K9s(id),
	equipment_id INTEGER NOT NULL REFERENCES equipment(id)
);


-- hardwire equipment in, won't change unless admin adds more --
INSERT INTO equipment (name)
VALUES ('In-squad kennel');

INSERT INTO equipment (name)
VALUES ('Ballistic vest');

INSERT INTO equipment (name)
VALUES ('Multi-threat vest');

INSERT INTO equipment (name)
VALUES ('Door pop/heat alarm');

-- hardwire certifications in, won't change unless admin adds more --
INSERT INTO certifications (name)
VALUES ('Explosives');

INSERT INTO certifications (name)
VALUES ('Narcotics');

INSERT INTO certifications (name)
VALUES ('Patrol');

INSERT INTO certifications (name)
VALUES ('Tracking/Trailing');

INSERT INTO certifications (name)
VALUES ('Other');

-- hardwire statuses in, won't change unless more need to be added --

INSERT INTO status (id, status_type, description) VALUES ('1', 'New Inquiry', 'A new inquiry has been added.');
INSERT INTO status (id, status_type, description) VALUES ('2', 'Inquiry Review', 'The completed inquiry is in review.');
INSERT INTO status (id, status_type, description) VALUES ('3', 'Form Sent', 'The inquiry was approved and an application form has been sent.');
INSERT INTO status (id, status_type, description) VALUES ('4', 'New Application', 'A new application form has been submitted.');
INSERT INTO status (id, status_type, description) VALUES ('5', 'Application Review', 'The completed application is in review.');
INSERT INTO status (id, status_type, description) VALUES ('6', 'Application Needs Revision', 'More information is needed / Information is incorrect.');
INSERT INTO status (id, status_type, description) VALUES ('7', 'Application Approved', 'The application has been approved.  Awaiting grant request.');
INSERT INTO status (id, status_type, description) VALUES ('8', 'Grant Approved', 'Grant for equipment has been approved.');
INSERT INTO status (id, status_type, description) VALUES ('9', 'Equipment Order Submitted', 'Equipment has been ordered.');
INSERT INTO status (id, status_type, description) VALUES ('10', 'Equipment Shipped', 'Equipment has been shipped to department address.');
INSERT INTO status (id, status_type, description) VALUES ('99', 'Admin', 'This user is an administrator');

---------------------------------///////////////////////////////////////////---------------------------------

--/// insert dummy data ///--
INSERT INTO users (email, contact_email, password, status, first_name, last_name, primary_phone, contact_time)
VALUES ('test@test.com', 'junk@junk.com', '123abc', 'New Inquiry', 'Bethany', 'Johnson', '555-555-5555', 'Morning');

INSERT INTO users (email, contact_email, password, status, first_name, last_name, primary_phone, contact_time)
VALUES ('test2@test2.com', 'junk2@junk2.com', '456def', 'Approved Inquiry', 'Rachel', 'Johnson', '444-444-4444', 'Morning');

INSERT INTO users (email, contact_email, password, status, first_name, last_name, primary_phone, contact_time)
VALUES ('test3@test3.com', 'junk3@junk3.com', '789ghi', 'New Application', 'Bethany', 'Johnson', '555-555-5555', 'Morning');

INSERT INTO K9s (user_id, k9_name, breed, age, k9_active_duty, k9_retirement, handler_rank, handler_first_name, handler_last_name, handler_badge, handler_cell_phone, handler_email)
VALUES (1, 'Calvin', 'German Shepherd', '96 months', TRUE, FALSE, 'Chief', 'Mark', 'Johnson', '550', '123-456-7890', 'mark@mark.com')
RETURNING id;

INSERT INTO K9s (user_id, k9_name, breed, age, k9_active_duty, k9_retirement, handler_rank, handler_first_name, handler_last_name, handler_badge, handler_cell_phone, handler_email)
VALUES (1, 'Roman', 'German Shepherd', '24 months', TRUE, FALSE, 'Deputy', 'Frank', 'Johnson', '430', '222-222-2222', 'frankie@frankie.com')
RETURNING id;

INSERT INTO K9_photos (url, K9_id)
VALUES ('https://www.dogpicture.com', 2);

INSERT INTO K9_photos (url, K9_id)
VALUES ('https://www.dogpicture2.com', 2);

INSERT INTO K9_photos (url, K9_id)
VALUES ('https://www.k9picture.com', 3);

INSERT INTO K9_photos (url, K9_id)
VALUES ('https://www.k9picture2.com', 3);

INSERT INTO K9s_equipment (k9_id, equipment_id)
VALUES (2, 1);

INSERT INTO K9s_equipment (k9_id, equipment_id)
VALUES (2, 2);

INSERT INTO K9s_certifications (k9_id, certification_id, URL)
VALUES (2, 1, 'https://www.certification.com');

INSERT INTO K9s_certifications (k9_id, certification_id, URL, notes)
VALUES (2, 6, 'https://www.certification2.com', 'Hugging');


--/// testing dummy data ///--

-- matches handlers/k9s with user (auth signer/dept) --
SELECT users.id, users.first_name, users.last_name, K9s.id, K9s.k9_name, K9s.handler_first_name, K9s.handler_last_name
FROM users
INNER JOIN K9s
ON users.id = K9s.user_id;

-- matches handlers/k9s with their k9 photos --
SELECT K9s.id, K9s.k9_name, K9_photos.url
FROM K9s
INNER JOIN K9_photos
ON K9s.id = K9_photos.K9_id;

-- returns equipment associated with k9/handler --
SELECT K9s.id, K9s.k9_name, equipment.name
FROM K9s
INNER JOIN K9s_equipment
ON K9s.id = K9s_equipment.K9_id
INNER JOIN equipment
ON K9s_equipment.equipment_id = equipment.id;

-- returns certifications associated with k9/handler --
SELECT K9s.id, K9s.k9_name, certifications.name
FROM K9s
INNER JOIN K9s_certifications
ON K9s.id = K9s_certifications.K9_id
INNER JOIN certifications
ON K9s_certifications.certification_id = certifications.id;
