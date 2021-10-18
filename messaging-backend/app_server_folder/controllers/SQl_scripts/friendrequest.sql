create table friendrequest (
	request_id serial primary key,
	from_user int references appuser (user_id),
	to_user int references appuser (user_id),
	proposed_name varchar ( 50 ) not null,
	proposed_description varchar( 500 ) not null,
	accepted int not null,
	time_sent timestamp default CURRENT_TIMESTAMP
);