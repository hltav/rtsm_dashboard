import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(req: NextRequest) {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await req.text(),
    credentials: "include",
  });

  const data = await res.text();

  const response = new NextResponse(data, { status: res.status });
  res.headers.forEach((value, key) => {
    if (!["transfer-encoding", "content-encoding", "connection"].includes(key.toLowerCase())) {
      response.headers.set(key, value);
    }
  });

  return response;
}
