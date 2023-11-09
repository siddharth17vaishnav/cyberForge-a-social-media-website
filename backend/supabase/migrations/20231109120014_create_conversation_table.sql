create table
  public.conversation (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    constraint conversation_pkey primary key (id)
  ) tablespace pg_default;