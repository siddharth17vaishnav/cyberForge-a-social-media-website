const StorageRotues = {
    POST:(path:string)=>`http://localhost:54321/storage/v1/object/public/posts/${path}`,
    PROFILE:(path:string)=>`http://localhost:54321/storage/v1/object/public/profiles/${path}`
}

export {StorageRotues}