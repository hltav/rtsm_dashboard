// import { ChangeEvent } from "react";
// import { uploadImage } from "upload-image-gdrive";

// export const uploadRtsmImage = async (
//   event: ChangeEvent<HTMLInputElement>
// ): Promise<string[]> => {
//   const folderId = process.env.NEXT_PUBLIC_FOLDER_ID;
//   const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
//   const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
//   const clientEmail = process.env.NEXT_PUBLIC_CLIENT_EMAIL;

//   if (!folderId || !clientId || !privateKey || !clientEmail) {
//     throw new Error(
//       "Google Drive environment variables not configured correctly."
//     );
//   }

//   const params = {
//     folderId,
//     clientId,
//     privateKey,
//     clientEmail,
//   };

//   const files = event.target.files;
//   if (!files || files.length === 0) return [];

//   const fileArray = Array.from(files);

//   const imageUrls = await Promise.all(
//     fileArray.map(async (file) => await uploadImage({ ...params, file }))
//   );

//   return imageUrls;
// };

import { ChangeEvent } from "react";
import { uploadImage } from "upload-image-gdrive";

type UploadImageResult = string | { url: string } | { error: string };

export const uploadRtsmImage = async (
  event: ChangeEvent<HTMLInputElement>
): Promise<string[]> => {
  const folderId = process.env.NEXT_PUBLIC_FOLDER_ID;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const clientEmail = process.env.NEXT_PUBLIC_CLIENT_EMAIL;

  if (!folderId || !clientId || !privateKey || !clientEmail) {
    throw new Error(
      "Google Drive environment variables not configured correctly."
    );
  }

  const params = {
    folderId,
    clientId,
    privateKey,
    clientEmail,
  };

  const files = event.target.files;
  if (!files || files.length === 0) {
    return [];
  }

  const fileArray = Array.from(files);

  const imageUrls = await Promise.all(
    fileArray.map(async (file) => {
      try {
        const result = (await uploadImage({ ...params, file })) as UploadImageResult;

        if (typeof result === "string") {
          return result;
        } else if (result && typeof result === "object" && "url" in result) {
          return result.url;
        } else {
          // Se o resultado não for uma URL válida, lançamos um erro
          // para interromper o processo de criação no backend.
          throw new Error("Formato de retorno do upload inválido.");
        }
      } catch (err) {
        // Logamos o erro detalhado e o relançamos
        console.error("Erro no upload da imagem:", err);
        throw err; // Isso vai fazer o Promise.all rejeitar
      }
    })
  );

  return imageUrls; 
};