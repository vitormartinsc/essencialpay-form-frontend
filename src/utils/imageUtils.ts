export const compressImage = async (file: File, maxSizeMB: number = 5): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Para mobile, reduzir dimensões mais agressivamente
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const maxDimension = isMobile ? 1024 : 1536; // Reduzido ainda mais
        
        // Calcular dimensões mantendo aspect ratio
        if (width > height && width > maxDimension) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Melhorar qualidade de redimensionamento
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Comprimir em loop até atingir o tamanho desejado
        let quality = isMobile ? 0.6 : 0.8; // Começar com qualidade menor
        const minQuality = 0.1;
        const targetSizeMB = Math.min(maxSizeMB, isMobile ? 1.5 : 3); // Muito menor para evitar erro do backend
        
        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const sizeInMB = blob.size / 1024 / 1024;
                console.log(`Image compression - Size: ${sizeInMB.toFixed(2)}MB, Quality: ${quality}, Target: ${targetSizeMB}MB`);
                
                if (sizeInMB > targetSizeMB && quality > minQuality) {
                  quality -= 0.1;
                  compress();
                } else {
                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  console.log(`✅ Final compressed file: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
                  resolve(compressedFile);
                }
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            quality
          );
        };
        
        compress();
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]); // Remove o prefixo data:image/...;base64,
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
