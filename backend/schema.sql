create table users (
  username text,
  avatar text not null,
  constraint pk_user primary key (username)
);

-- Users connections and users online statuses were separated from the users table to normalize it

create table users_connections (
  username text,
  connection_id text not null,
  constraint pk_user_connection primary key (username),
  constraint fk_user_connection_user foreign key (username) references users (username)
);

create table users_statuses (
  username text,
  is_online boolean not null,
  constraint pk_user_status primary key (username),
  constraint fk_user_status_user foreign key (username) references users(username)
)

create table messages (
  id serial,
  sender text not null,
  receiver text not null,
  content text not null,
  sent_at timestamptz not null,
  constraint pk_message primary key (id)
);