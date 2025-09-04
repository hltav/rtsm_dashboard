import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL as string;

async function handleProxy(req: NextRequest, path: string[]) {
  const targetUrl = `${BACKEND_URL}/${path.join("/")}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("cookie");

  const res = await fetch(targetUrl, {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
    credentials: "include",
  });

  const responseText = await res.text();

  const response = new NextResponse(responseText, { status: res.status });

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
