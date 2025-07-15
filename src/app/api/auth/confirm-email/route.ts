import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Verifica se o token foi fornecido
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 400 }
      );
    }

    // Chama a API externa de confirmação
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    // Se a resposta não for OK, retorna o erro da API
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Falha ao confirmar e-mail" },
        { status: res.status }
      );
    }

    // Retorna sucesso
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erro na confirmação de e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}