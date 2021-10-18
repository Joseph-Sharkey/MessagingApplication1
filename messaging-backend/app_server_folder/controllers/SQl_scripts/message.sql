create table message(
	message_key serial primary key,
	content varchar ( 500 ) not null,
	sent_by int references appuser (user_id),
	sent_to int references chat (chat_key)
);