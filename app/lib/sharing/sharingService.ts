interface ShareData {
  title: string
  text: string
  url?: string
  imageUrl?: string
}

class SharingService {
  private static instance: SharingService

  private constructor() {}

  public static getInstance(): SharingService {
    if (!SharingService.instance) {
      SharingService.instance = new SharingService()
    }
    return SharingService.instance
  }

  public async shareContent(data: ShareData): Promise<boolean> {
    try {
      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: data.url
        })
        return true
      }

      // Fallback for browsers that don't support Web Share API
      return this.fallbackShare(data)
    } catch (error) {
      console.error('Failed to share:', error)
      return false
    }
  }

  private fallbackShare(data: ShareData): boolean {
    const text = `${data.title}\n\n${data.text}`
    const url = data.url ? `\n\n${data.url}` : ''
    
    // Create a temporary textarea
    const textarea = document.createElement('textarea')
    textarea.value = text + url
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    
    try {
      textarea.select()
      document.execCommand('copy')
      alert('Content copied to clipboard!')
      return true
    } catch (error) {
      console.error('Failed to copy:', error)
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }

  public async shareImage(imageUrl: string, caption: string): Promise<boolean> {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const file = new File([blob], 'memory.jpg', { type: 'image/jpeg' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Shared Memory',
          text: caption
        })
        return true
      }

      return this.fallbackShare({ title: 'Shared Memory', text: caption, imageUrl })
    } catch (error) {
      console.error('Failed to share image:', error)
      return false
    }
  }
}

export const sharingService = SharingService.getInstance() 