import type { RegisterFormValues, LoginFormValues } from "@/src/validations/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

function setTokenCookie(token: string) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7) // 7 days
  document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
}

export async function registerUser(data: RegisterFormValues) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  })

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(body.message || "Registration failed")
  }

  if (body.data?.token) setTokenCookie(body.data.token)

  return body
}

export async function loginUser(data: LoginFormValues) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  })

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(body.message || "Login failed")
  }

  if (body.data?.token) setTokenCookie(body.data.token)

  return body
}

export function getTokenFromCookie() {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'))
  return match ? match[2] : null
}
