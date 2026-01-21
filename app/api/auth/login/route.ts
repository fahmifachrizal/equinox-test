import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ success: true, token: data.token })
    }

    const errorData = await response.text()
    return NextResponse.json(
      { success: false, message: errorData || "Invalid credentials" },
      { status: 401 },
    )
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    )
  }
}
