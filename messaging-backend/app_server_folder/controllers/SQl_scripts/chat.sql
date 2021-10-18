create table chat (
	chat_key serial primary key,
	chat_name varchar( 50 ) not null,
	chat_description varchar( 500 ) not null,
	created_on timestamp default CURRENT_TIMESTAMP
);