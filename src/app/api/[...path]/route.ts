import { NextRequest, NextResponse } from "next/server";

// Backend real (NestJS)
const BACKEND_URL = process.env.BACKEND_URL as string;

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path);
}

async function handleProxy(req: NextRequest, path: string[]) {
  const targetUrl = `${BACKEND_URL}/${path.join("/")}`;

  const res = await fetch(targetUrl, {
    method: req.method,
    headers: { "Content-Type": "application/json" },
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
    credentials: "include",
  });

  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: res.headers,
  });
}
