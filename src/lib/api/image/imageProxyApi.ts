import apiClient from "../apiBaseUrl";

export const imageProxyApi = {
  ///Converte uma URL externa para uma URL do proxy do BACKEND
  getProxyImageUrl(url: string | null | undefined): string {
    if (!url) {
      return "/images/default.png";
    }

    if (url.startsWith("/proxy/images/")) {
      return url;
    }

    if (url.startsWith("/images/") || url.startsWith("/")) {
      return url;
    }

    try {
      const encodedUrl = btoa(url);
      const proxyUrl = `/proxy/images/${encodeURIComponent(encodedUrl)}`;

      return proxyUrl;
    } catch {
      return "/images/default.png";
    }
  },

  //Busca os bytes da imagem (Blob) do BACKEND NestJS.
  async getImageBlob(externalUrl: string): Promise<Blob> {
    const proxyUrl = this.getProxyImageUrl(externalUrl);

    const response = await apiClient.get(proxyUrl, {
      responseType: "blob",
    });
    return response.data;
  },

  getFullProxyUrl(url: string | null | undefined): string {
    if (!url) return "/images/default.png";

    // URLs locais
    if (url.startsWith("/images/") || url.startsWith("/")) {
      return url;
    }

    try {
      const encodedUrl = btoa(url);
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      return `${backendUrl}/proxy/images/${encodeURIComponent(encodedUrl)}`;
    } catch {
      return "/images/default.png";
    }
  },
};
