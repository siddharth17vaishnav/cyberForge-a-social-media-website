export interface UserType {
  [key: string]: string | number | undefined
  id: number
  userName: string
  firstName: string
  lastName: string
  email: string
  profile?: string
}
