export interface ModalsType {
  [key: string]: boolean | { id: number; value: boolean }
  createPost: boolean
  logout: boolean
  postOptions: { id: number; value: boolean }
  commentSection: { id: number; value: boolean }
  viewPost: { id: number; value: boolean }
  editProfile: boolean
}
