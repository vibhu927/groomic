"use client"
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import usePlaylistStore from '@/global/streams/streamStore'

interface SongQueueItemProps {
  hasStreams: boolean;
  setHasStreams: (value: boolean) => void;
}

export function SongQueueItem({ hasStreams, setHasStreams }: SongQueueItemProps) {
  const playlist = usePlaylistStore((state) => state.playlist);
  const addSong = usePlaylistStore((state) => state.addSong);
  


  // async function handleUpvote(streamId: string) {
  //   try {
  //     await axios.post('/api/streams/upvote', { streamId });
  //     // Update votes in global state
  //     const updatedStream = playlist.find(stream => stream.id === streamId);
  //     if (updatedStream) {
  //       updateSongVotes(streamId, {
  //         upvotes: updatedStream.upvotes + 1,
  //         downvotes: updatedStream.downvotes
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error upvoting:', error);
  //     fetchStreams(); // Refresh on error
  //   }
  // }

  // async function handleDownvote(streamId: string) {
  //   try {
  //     await axios.post('/api/streams/downvote', { streamId });
  //     // Update votes in global state
  //     const updatedStream = playlist.find(stream => stream.id === streamId);
  //     if (updatedStream) {
  //       updateSongVotes(streamId, {
  //         upvotes: updatedStream.upvotes,
  //         downvotes: updatedStream.downvotes + 1
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error downvoting:', error);
  //     fetchStreams(); // Refresh on error
  //   }
  // }
  if (!hasStreams || playlist.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {playlist.map((stream) => (
        <div
          key={stream.id}
          className="flex items-center gap-4 p-4 hover:bg-white/10 rounded-lg group transition-colors"
        >
          <img
            src={stream.smallImg}
            alt={stream.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate text-white">{stream.title}</h4>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="text-[#1DBBB4] hover:text-[#1DBBB4]/90 hover:bg-white/10"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {stream.upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="text-[#FF6B2C] hover:text-[#FF6B2C]/90 hover:bg-white/10"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              {stream.downvotes}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}