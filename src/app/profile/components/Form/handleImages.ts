const IMAGE_CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024,
    ACCEPTED_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    MAX_ENGAGEMENT_IMAGES: 4,
  };

export type ImageUploadState = {
    file: File | null;
    preview: string;
    uploading: boolean;
    error: string | null;
  }


export const validateImage = (file: File): string | null => {
    if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }
    if (!IMAGE_CONFIG.ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid image format";
    }
    return null;
  };
    