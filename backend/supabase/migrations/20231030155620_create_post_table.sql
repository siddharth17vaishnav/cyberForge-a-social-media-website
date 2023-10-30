create table
  public.posts (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    description text null,
    image text null,
    user_id bigint not null,
    constraint posts_pkey primary key (id),
    constraint posts_user_id_fkey foreign key (user_id) references user_profiles (id)
  ) tablespace pg_default;