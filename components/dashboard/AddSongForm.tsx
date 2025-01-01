'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Music } from 'lucide-react'
import axios from 'axios'
import { useParams, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import usePlaylistStore from '@/global/streams/streamStore'

export function AddSongForm() {
  const [url, setUrl] = useState('')
  const pathname = usePathname(); 
  const pathParts = pathname.split('/').filter(Boolean);
  const memory = sessionStorage.getItem('currentRoom');
  const addSong = usePlaylistStore((state) => state.addSong); 

  let room : any;
  if (memory != null)  room = JSON.parse(memory);
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const res = await axios.post('/api/streams', 
      {
       creatorId: pathParts[1],
       url: url,
       roomId: room.id
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if(res.data != null){
      toast.success(res.data.message);
      addSong({
        id: res.data.data.id,
        title: res.data.data.title,
        extractedUrl: res.data.data.extractedurl,
        isEnded: res.data.data.isEnded,
        url: url,
        upvotes: res.data.data.upvotes,
        downvotes: res.data.data.downvotes,
        smallImg: res.data.data.smallImg
      })
     
    }
    else{
      toast.error("Failed to add song.");
    }
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="url"
        placeholder="Paste YouTube or Spotify link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
      />
      <Button type="submit" className="bg-[#FF6B2C] hover:bg-[#FF6B2C]/90 text-white">
        <Music className="w-4 h-4 mr-2" />
        Add Song
      </Button>
    </form>
  )
}

