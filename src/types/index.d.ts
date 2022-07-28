declare module 'nuwszy' {
  export type Post = {
    id: number
    title: string
    content: string
    slug: string
    created_at: string
  }

  export type SignupUserPayload = {
    name: string
    email: string
    password: string
  }

  export type SigninUserPayload = {
    email: string
    password: string
  }

  export type User = {
    id: string
    email: string
    name: string
  }
}
