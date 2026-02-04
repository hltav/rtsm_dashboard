import apiClient from "../apiBaseUrl";

export const imageProxyApi = {
  /**
   * Converte uma URL externa para uma URL do proxy do BACKEND
   */
  getProxyImageUrl(url: string | null | undefined): string {
    console.log("🖼️ [imageProxyApi] getProxyImageUrl CHAMADO!");
    console.log("📥 [imageProxyApi] URL recebida:", url);
    console.log("📥 [imageProxyApi] Tipo da URL:", typeof url);

    if (!url) {
      console.log("⚠️ [imageProxyApi] URL vazia, retornando default");
      return "/images/default.png";
    }

    if (url.startsWith("/proxy/images/")) {
      console.log("ℹ️ [imageProxyApi] Já é URL de proxy, retornando");
      return url;
    }

    if (url.startsWith("/images/") || url.startsWith("/")) {
      console.log("ℹ️ [imageProxyApi] URL local, retornando");
      return url;
    }

    try {
      const encodedUrl = btoa(url);
      const proxyUrl = `/proxy/images/${encodeURIComponent(encodedUrl)}`;
      console.log("✅ [imageProxyApi] URL proxificada:", proxyUrl);
      return proxyUrl;
    } catch (e) {
      console.error("❌ [imageProxyApi] Erro ao gerar URL:", e);
      return "/images/default.png";
    }
  },
  /**
   * Busca os bytes da imagem (Blob) do BACKEND NestJS.
   */
  async getImageBlob(externalUrl: string): Promise<Blob> {
    const proxyUrl = this.getProxyImageUrl(externalUrl);

    // ✅ CORRIGIDO: apiClient já deve estar configurado para apontar ao backend
    // Certifique-se que apiClient.baseURL = "http://localhost:4000/api" ou similar
    const response = await apiClient.get(proxyUrl, {
      responseType: "blob",
    });
    return response.data;
  },

  /**
   * 🆕 MÉTODO ALTERNATIVO: Retorna URL completa para uso direto em <img src>
   * Útil para renderizar imagens sem precisar baixar o blob primeiro
   */
  getFullProxyUrl(url: string | null | undefined): string {
    if (!url) return "/images/default.png";

    // URLs locais
    if (url.startsWith("/images/") || url.startsWith("/")) {
      return url;
    }

    try {
      const encodedUrl = btoa(url);
      // Retorna URL completa do backend (pegue de variável de ambiente)
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      return `${backendUrl}/proxy/images/${encodeURIComponent(encodedUrl)}`;
    } catch (e) {
      console.error("Erro ao gerar URL do proxy:", e);
      return "/images/default.png";
    }
  },
};
