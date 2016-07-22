CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(255) UNIQUE,
  password VARCHAR,
	active BOOLEAN,
	admin BOOLEAN,
  applicationID INTEGER,
	created TIMESTAMP DEFAULT current_timestamp
);

-- application will have a one to one relationship with inquiries and users,
-- but will have a one to many with K9s
CREATE TABLE application (
  id SERIAL PRIMARY KEY NOT NULL,
  inquiryID INTEGER,
  userID INTEGER,

);

CREATE TABLE inquiry (
  id SERIAL PRIMARY KEY NOT NULL,



);

CREATE TABLE K9 (
  id SERIAL PRIMARY KEY NOT NULL,
  
);
