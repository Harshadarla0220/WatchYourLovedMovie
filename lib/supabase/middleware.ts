import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  // For now, allow all requests through
  // Authentication will be handled client-side and in API routes
  return NextResponse.next({
    request,
  })
}
