create table account (
	user_id serial primary key,
	email varchar ( 50 ) unique not null,
	password varchar( 500 ) not null,
	created_on timestamp default CURRENT_TIMESTAMP
);

