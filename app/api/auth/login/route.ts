import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  if (username && password) {
    // Fake successful login
    return NextResponse.json(
      { success: true, token: "fake-jwt-token" },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  )
}
