import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Erro na API externa' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
