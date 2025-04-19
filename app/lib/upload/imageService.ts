class ImageService {
  private static instance: ImageService
  private readonly maxSize = 5 * 1024 * 1024 // 5MB

  private constructor() {}

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService()
    }
    return ImageService.instance
  }

  public async uploadImage(file: File): Promise<string> {
    if (!this.validateFile(file)) {
      throw new Error('Invalid file')
    }

    const resizedImage = await this.resizeImage(file)
    const base64String = await this.convertToBase64(resizedImage)
    
    // Store in localStorage (in a real app, you'd upload to a server)
    const imageId = Date.now().toString()
    localStorage.setItem(`image_${imageId}`, base64String)
    
    return imageId
  }

  public getImage(imageId: string): string | null {
    return localStorage.getItem(`image_${imageId}`)
  }

  private validateFile(file: File): boolean {
    if (file.size > this.maxSize) {
      throw new Error('File too large')
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type')
    }

    return true
  }

  private async resizeImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        const maxWidth = 1200
        const maxHeight = 1200
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create blob'))
            }
          },
          'image/jpeg',
          0.8
        )
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }
    })
  }

  private async convertToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert to base64'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(blob)
    })
  }
}

export const imageService = ImageService.getInstance() 