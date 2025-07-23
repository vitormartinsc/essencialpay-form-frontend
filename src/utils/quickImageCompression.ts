/**
 * Compressão rápida e leve de imagens no frontend
 * Objetivo: reduzir tamanho para evitar timeout sem sobrecarregar o dispositivo
 */

export interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  maxSizeKB: number;
}

// Configurações otimizadas para diferentes tipos de arquivo
export const COMPRESSION_SETTINGS = {
  // Para documentos - compressão mais agressiva para mobile
  document: {
    maxWidth: 1000, // Reduzido de 1200
    maxHeight: 1400, // Reduzido de 1600
    quality: 0.65, // Reduzido de 0.7
    maxSizeKB: 600 // Reduzido de 800KB
  },
  // Para selfie - compressão mais agressiva
  selfie: {
    maxWidth: 700, // Reduzido de 800
    maxHeight: 1000, // Reduzido de 1200
    quality: 0.7, // Reduzido de 0.75
    maxSizeKB: 400 // Reduzido de 600KB
  },
  // Para comprovante - otimizado
  residenceProof: {
    maxWidth: 1200, // Reduzido de 1400
    maxHeight: 1600, // Reduzido de 2000
    quality: 0.75, // Reduzido de 0.8
    maxSizeKB: 800 // Reduzido de 1200KB
  }
} as const;

/**
 * Compressão rápida que não trava o navegador
 */
export const quickCompressImage = async (
  file: File,
  options: CompressionOptions,
  onProgress?: (message: string) => void
): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Se o arquivo já é menor que o limite, retorna como está
    if (file.size <= options.maxSizeKB * 1024) {
      onProgress?.('Arquivo já otimizado ✅');
      resolve(file);
      return;
    }

    onProgress?.('Otimizando imagem...');
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        onProgress?.('Redimensionando...');
        
        // Calcular dimensões mantendo proporção
        let { width, height } = img;
        
        if (width > options.maxWidth || height > options.maxHeight) {
          const ratio = Math.min(options.maxWidth / width, options.maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem redimensionada
        ctx?.drawImage(img, 0, 0, width, height);

        onProgress?.('Comprimindo...');

        // Converter para blob com qualidade específica
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Erro ao comprimir imagem'));
            return;
          }

          // Criar novo arquivo com o blob comprimido
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg', // Sempre converte para JPEG para melhor compressão
            lastModified: Date.now(),
          });

          const reduction = Math.round((1 - compressedFile.size / file.size) * 100);
          
          console.log(`📸 Compressão rápida concluída:
            Original: ${Math.round(file.size / 1024)}KB
            Comprimido: ${Math.round(compressedFile.size / 1024)}KB
            Redução: ${reduction}%`);

          onProgress?.(`Otimizado! ${reduction}% menor ✅`);
          resolve(compressedFile);
        }, 'image/jpeg', options.quality);

      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Função helper para comprimir com base no tipo de arquivo
 */
export const compressFileByType = async (
  file: File, 
  fileType: keyof typeof COMPRESSION_SETTINGS,
  onProgress?: (message: string) => void
): Promise<File> => {
  // Se não é imagem, retorna como está
  if (!file.type.startsWith('image/')) {
    onProgress?.('Arquivo PDF mantido original');
    return file;
  }

  const settings = COMPRESSION_SETTINGS[fileType];
  
  try {
    return await quickCompressImage(file, settings, onProgress);
  } catch (error) {
    console.warn('⚠️ Erro na compressão, usando arquivo original:', error);
    onProgress?.('Usando arquivo original');
    return file;
  }
};

/**
 * Validar se o arquivo ainda é muito grande após compressão
 */
export const validateCompressedFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
};
