const StorageRotues = {
  POST: (path: string) =>
    `https://tdosybnhdujmlaljiaiy.supabase.co/storage/v1/object/public/posts/${path}`,
  PROFILE: (path: string) =>
    `https://tdosybnhdujmlaljiaiy.supabase.co/storage/v1/object/public/profiles/${path}`
}

export { StorageRotues }
