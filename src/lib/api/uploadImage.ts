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
import axios from "axios";

export const uploadRtsmImage = async (event: ChangeEvent<HTMLInputElement>): Promise<string[]> => {
  const files = event.target.files;
  if (!files || files.length === 0) return [];

  const fileArray = Array.from(files);

  const imageUrls = await Promise.all(
    fileArray.map(async (file) => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('/api/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.url) {
          return response.data.url;
        }

        throw new Error("Erro no upload da imagem.");
      } catch (err) {
        console.error("Erro no upload:", err);
        throw err;
      }
    })
  );

  return imageUrls.filter((url): url is string => !!url);
};