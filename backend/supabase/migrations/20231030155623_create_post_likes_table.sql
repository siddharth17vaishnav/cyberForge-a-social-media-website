CREATE TABLE public.post_likes (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    CONSTRAINT likes_pkey PRIMARY KEY (id),
    CONSTRAINT post_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    CONSTRAINT post_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_profiles (id) ON DELETE CASCADE
) TABLESPACE pg_default;

    -- DROP POLICY "Access All" ON public.post_likes;
    create policy "Access All" on public.post_likes for all using ( true );