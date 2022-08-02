declare module 'nuwszy' {
  export type Post = {
    id: number
    title: string
    description: string
    thumbnail: string
    content: string
    category: string
    slug: string
    user_id: string
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
