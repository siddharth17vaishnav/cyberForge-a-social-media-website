create table
  public.post_likes (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    user_id bigint not null,
    post_id bigint not null,
    constraint likes_pkey primary key (id),
    constraint post_likes_post_id_fkey foreign key (post_id) references posts (id),
    constraint post_likes_user_id_fkey foreign key (user_id) references user_profiles (id)
  ) tablespace pg_default;

    -- DROP POLICY "Access All" ON public.post_likes;
    create policy "Access All" on public.post_likes for all using ( true );