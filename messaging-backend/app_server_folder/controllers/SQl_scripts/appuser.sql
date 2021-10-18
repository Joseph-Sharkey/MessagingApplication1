create table appuser (
	user_id serial primary key,
	username varchar ( 50 ) not null,
	description varchar ( 500 ) not null,
	created_on timestamp default CURRENT_TIMESTAMP
);
