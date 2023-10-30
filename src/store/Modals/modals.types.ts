export interface ModalsType {
  [key: string]: boolean | { id: number; value: boolean }
  createPost: boolean
  logout: boolean
  postOptions: { id: number; value: boolean }
}
