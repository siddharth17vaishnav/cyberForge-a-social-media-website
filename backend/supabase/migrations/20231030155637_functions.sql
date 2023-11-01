CREATE OR REPLACE FUNCTION get_posts_with_likes_and_users()
RETURNS TABLE (
   id bigint,
   description text,
   image text,
   user_id bigint,
   user_profiles jsonb,
   created_at timestamp with time zone,
   likes jsonb
)
LANGUAGE plpgsql AS $$
BEGIN
   RETURN QUERY
   SELECT
      p.id AS id,
      p.description,
      p.image,
      p.user_id,
      jsonb_build_object(
         'user_id', u.id,
         'user_name', u.user_name,
         'first_name', u.first_name,
         'last_name', u.last_name,
         'profile', u.profile,
         'email', u.email
      ) AS user_profiles,
      p.created_at,
      (
         SELECT jsonb_agg(jsonb_build_object(
            'created_at', l.created_at,
            'id', l.id,
            'post_id', l.post_id,
            'user_id', l.user_id
         )) FROM post_likes l
         WHERE l.post_id = p.id
      ) AS likes
   FROM posts p
   JOIN user_profiles u ON p.user_id = u.id
   ORDER BY p.created_at DESC;
END;
$$;