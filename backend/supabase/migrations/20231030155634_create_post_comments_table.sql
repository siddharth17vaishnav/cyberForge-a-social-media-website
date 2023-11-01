create table
  public.post_comments (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    comment text not null,
    post_id bigint not null,
    user_id bigint not null,
    constraint post_comments_pkey primary key (id),
    constraint post_comments_post_id_fkey foreign key (post_id) references posts (id),
    constraint post_comments_user_id_fkey foreign key (user_id) references user_profiles (id)
  ) tablespace pg_default;

    -- DROP POLICY "Access All" ON public.post_comments;
    create policy "Access All" on public.post_comments for all using ( true );