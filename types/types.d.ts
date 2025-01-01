
interface CurrentlyPlayingProps {
    onPlayPause: () => void
    onSkipForward: () => void
  }

  interface ShareRoomModalProps {
    isOpen: boolean
    onClose: () => void
    roomLink: string
  }

  interface CreateStreamModalProps {
    isOpen: boolean
    onClose: () => void
    onCreateStream: (title: string, description: string, image: string) => void
  }
  interface Stream {
    id: string
    title: string
    extractedUrl: string
    isEnded: boolean
    url: string
    upvotes: number
    downvotes: number
    smallImg: string
  }
  
  interface SongQueueItemProps {
    hasStreams: boolean
    setHasStreams: (value: boolean) => void
  }

  interface StreamCardProps {
    title: string
    host: string
    listeners: number
    thumbnail: string
  }