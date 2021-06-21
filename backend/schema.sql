create table users (
  username text,
  avatar text,
  constraint pk_user primary key (username)
);

create table users_connections (
  username text,
  connection_id text,
  constraint fk_user_connection_user foreign key (username) references users (username)
);

create table messages (
  id serial,
  sender text not null,
  receiver text not null,
  content text not null,
  sent_at timestamptz not null,
  constraint pk_message primary key (id)
);

create table bots (
  username text,
  avatar text,
  constraint pk_bot primary key (username)
);