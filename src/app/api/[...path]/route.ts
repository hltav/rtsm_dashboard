import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

async function handleProxy(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/^\/api/, "");
  const targetUrl = `${BACKEND_URL}${path}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const res = await fetch(targetUrl, {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
    credentials: "include",
  });

  const text = await res.text();
  const response = new NextResponse(text, { status: res.status });

  res.headers.forEach((value, key) => {
    if (
      !["transfer-encoding", "content-encoding", "connection"].includes(
        key.toLowerCase()
      )
    ) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export async function GET(req: NextRequest) {
  return handleProxy(req);
}
export async function POST(req: NextRequest) {
  return handleProxy(req);
}
export async function PUT(req: NextRequest) {
  return handleProxy(req);
}
export async function DELETE(req: NextRequest) {
  return handleProxy(req);
}
