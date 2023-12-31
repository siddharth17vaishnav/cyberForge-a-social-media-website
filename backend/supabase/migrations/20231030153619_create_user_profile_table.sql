create table
  public.user_profiles (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    first_name text null,
    last_name text null,
    profile character varying null,
    email character varying null,
    user_name character varying null,
    bio character varying null,
    constraint user_profiles_pkey primary key (id),
    constraint unique_email unique (email),
    constraint unique_user_name unique (user_name)
  ) tablespace pg_default;

  alter  table public.user_profiles enable row level security;

  -- DROP POLICY "Access All" ON public.user_profiles;
  create policy "Access All" on public.user_profiles for all using ( true );

  insert into storage.buckets (id, name, public) values ('profiles', 'profiles', true);

  CREATE POLICY "allow profiles" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'profiles');
