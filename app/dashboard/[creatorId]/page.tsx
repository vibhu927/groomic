"use client";

import { StreamCard } from "@/components/dashboard/StreamCard";
import { SongQueueItem } from "@/components/dashboard/SongQueue";
import { AddSongForm } from "@/components/dashboard/AddSongForm";
import { CurrentlyPlaying } from "@/components/dashboard/CurrentlyPlaying";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Plus, Search, Users } from 'lucide-react';
import { useEffect, useState } from "react";
import { CreateStreamModal } from "@/components/dashboard/CreateStreamModal";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import usePlaylistStore from "@/global/streams/streamStore";
import createNeonInitialsImage from "@/lib/common/StringToImage";

// Mock data
const activeStreams = [
  {
    id: 1,
    title: "Friday Night Vibes",
    host: "DJ Alex",
    listeners: 234,
    thumbnail: "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg"  
  },
  {
    id: 2,
    title: "Chill Lofi Study Session",
    host: "Sarah",
    listeners: 156,
    thumbnail: "https://nikonrumors.com/wp-content/uploads/2014/03/Nikon-1-V3-sample-photo.jpg"
  },
  {
    id: 3,
    title: "Rock Classics Marathon",
    host: "Mike",
    listeners: 189,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YHsdZvuseaOKn4vL_r9VnDQJw4nWtGAE4A&s",
  },
  {
    id: 4,
    title: "Jazz & Coffee",
    host: "Emily",
    listeners: 112,
    thumbnail: "https://www.sony.net/Products/di_photo-gallery/images/extralarge/2045.JPG",
  },
];

export default function Dashboard() {
  const [hasRooms, setHasRooms] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hasStreams, setHasStreams] = useState(false);
  const addSong = usePlaylistStore((state)=>state.addSong)
  const [currentRoom, setCurrentRoom] = useState({
    title: "",
    description: "",
    image: ""
  });
  async function fetchStreams() {
    try {
      const memory = sessionStorage.getItem('currentRoom');
      if(memory != null){
        const roomDetails = JSON.parse(memory);
        const res = await axios.get(`/api/streams/my?roomId=${roomDetails.id}`);
        if (res.data.streams.length !== 0) {
          addSong(res.data.streams);
          setHasStreams(true);
        } else {
          setHasStreams(false);
        }
      } else {
        toast.error('No joined room found 😒');
        setHasStreams(false);
      }
    } catch (error) {
      console.error('Error fetching streams:', error);
      setHasStreams(false);
    }
  }
  useEffect(() => {
    const storedRoom = sessionStorage.getItem("currentRoom");
    if (storedRoom !== null) {
      try {
        const roomDetails = JSON.parse(storedRoom);
        setCurrentRoom({
          title: roomDetails.name || "",
          description: roomDetails.description || "",
          image: roomDetails.image || ""
        });
        setHasRooms(true);
        fetchStreams();
      } catch (error) {
        console.error("Error parsing room details from session storage:", error);
      }
    }
  }, []);

  const handleCreateStream = (title: string, description: string, image: string) => {
    setCurrentRoom({ title, description, image });
    setHasRooms(true);
    setIsCreateModalOpen(false);
  };
  
// const liveStreams = activeStreams.map((stream) => ({
//   ...stream,
//   thumbnail: createNeonInitialsImage(stream.title)
// }));
  
  return (
    <div className="min-h-screen bg-[#1B1E2B] text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] to-[#00958A]">
            Music Rooms
          </h1>
          <Button
            className="bg-[#00BFA5] hover:bg-[#00958A] text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Left side: Player and Queue */}
          <div className="flex-grow space-y-8 w-2/3">
            {hasRooms ? (
              <div className="bg-[#252836] backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[#00BFA5]/10">
                <div className="relative h-48 md:h-64">
                  <Image
                    src={currentRoom.image || "/placeholder.svg?height=200&width=400"}
                    alt={currentRoom.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E2B]/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentRoom.title}</h2>
                    <p className="text-sm md:text-base text-white/80">{currentRoom.description}</p>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-[#FF5733]" />
                      <span className="text-sm text-white/60">160 members</span>
                    </div>
                    <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-[#FF6B2C] mx-1 hover:bg-[#FF6B2C]/90 text-white hover:text-white transition-colors duration-300"
                    >
                      Invite Friends
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-[#FF6B2C] mx-1 hover:bg-[#FF6B2C]/90 text-white hover:text-white transition-colors duration-300"
                    >End Room
                    </Button>
                    </div>
                  </div>

                  <CurrentlyPlaying
                    onPlayPause={() => {}}
                    onSkipForward={() => {}}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#00BFA5]">Add a Song</h3>
                    <AddSongForm />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#00BFA5]">Queue</h3>
                    <div className="bg-[#2A2F3F] rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00BFA5]/20 scrollbar-track-transparent">
                      <SongQueueItem
                        hasStreams={hasStreams}
                        setHasStreams={setHasStreams}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 h-full">
                <p className="text-3xl font-bold text-white">
                  No active Rooms found.
                </p>
                <Button
                  className="bg-[#00BFA5] hover:bg-[#00958A] text-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create a Room
                </Button>
              </div>
            )}
          </div>

          {/* Right side: Rooms list */}
          <div className="w-1/3 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00BFA5]" />
              <Input
                placeholder="Search rooms..."
                className="pl-10 bg-[#252836] border-[#252836] text-white placeholder:text-white/40 w-full focus:border-[#00BFA5] transition-colors duration-300"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#00BFA5]">
                Active Rooms
              </h2>
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-hide scrollbar-thumb-[#00BFA5]/20 scrollbar-track-transparent">
                {activeStreams.map((stream) => (
                  <div 
                    key={stream.id} 
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-[#252836] p-4 rounded-lg border border-white/5 hover:border-[#00BFA5]/50 transition-colors duration-300">
                      <StreamCard {...stream} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateStreamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateStream={handleCreateStream}
      />
    </div>
  );
}

