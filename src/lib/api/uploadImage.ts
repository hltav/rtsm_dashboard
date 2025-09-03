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