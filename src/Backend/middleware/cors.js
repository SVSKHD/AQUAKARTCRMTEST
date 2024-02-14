import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle OPTIONS method for preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200 });
  }

  return res;
}
