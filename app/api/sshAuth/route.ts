import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function GET(request: Request) {
  console.log(request);
  return NextResponse.json({ test: "hey" });
}
