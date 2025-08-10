import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_FOLDER_ID = process.env.GOOGLE_FOLDER_ID;


const createGoogleDriveClient = async () => {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("As credenciais do Google Drive não estão configuradas.");
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  await auth.authorize();
  return google.drive({ version: "v3", auth });
};


export async function POST(req: NextRequest) {
  try {
    const drive = await createGoogleDriveClient();

    
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "Nenhum arquivo encontrado." },
        { status: 400 }
      );
    }

 
    const buffer = Buffer.from(await file.arrayBuffer());

    if (!GOOGLE_FOLDER_ID) {
      throw new Error("GOOGLE_FOLDER_ID não configurado");
    }

    const fileMetadata = {
      name: file.name,
      parents: [GOOGLE_FOLDER_ID],
    };

    const media = {
      mimeType: file.type,
      body: Readable.from(buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink, thumbnailLink",
    });

    if (response.data.id) {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      return NextResponse.json({ url: response.data.thumbnailLink });
    }

    throw new Error("Upload do arquivo falhou.");
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return NextResponse.json(
      { message: "Falha interna do servidor." },
      { status: 500 }
    );
  }
}
