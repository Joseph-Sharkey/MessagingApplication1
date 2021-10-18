CREATE TABLE account(
	user_id serial PRIMARY KEY,
	email VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR( 500 ) NOT NULL,	
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


--> the password is 500 because it needs to be long enough for the hashing function to be able to fit the data inside