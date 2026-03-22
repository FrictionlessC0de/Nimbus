export interface AuthUser {
  id: string
  name: string | null
  email: string
  image?: string | null
  createdAt: Date
}

export interface AuthSession {
  user: AuthUser
  expires: string
}

export type AuthProvider = "google" | "github" | "credentials"

export type AuthMode = "sign-in" | "sign-up"