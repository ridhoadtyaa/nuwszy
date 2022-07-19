declare module 'nuwszy' {
  export type Post = {
    id: number
    title: string
    content: string
    slug: string
    created_at: string
  }

  export type SignupUserPayload = {
    email: string
    password: string
  }

  export type SigninUserPayload = {
    email: string
    password: string
  }
}
