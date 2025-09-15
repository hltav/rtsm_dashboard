import { NextRequest, NextResponse } from "next/server";
import apiClient from "../../apiBaseUrl";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "E-mail não fornecido" },
        { status: 400 }
      );
    }

    // 🚀 Axios já joga exceção se o status >= 400
    const res = await apiClient.post("/auth/forgot-password", { email });
    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Erro na API forgot-password:", error);

    // Captura erro de Axios
    if (error.response) {
      return NextResponse.json(
        {
          error:
            error.response.data?.message ||
            "Erro ao solicitar redefinição de senha",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
