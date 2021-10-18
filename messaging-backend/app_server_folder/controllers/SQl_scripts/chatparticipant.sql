create table chatparticipant (
	participant_id serial primary key,
	user_key int references appuser (user_id),
	chat_key int references chat (chat_key)
);