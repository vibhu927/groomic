"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePlaylistStore from "@/global/streams/streamStore";

interface CurrentlyPlayingProps {
  onSkipForward: () => void;
  onPlayPause: () => void;
}

export function CurrentlyPlaying({
  onSkipForward,
  onPlayPause,
}: CurrentlyPlayingProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const nextSong = usePlaylistStore((state) => state.playNext);
  const currentPlaying = usePlaylistStore((state) => state.currentPlaying);
  
  // const playNextStream = useCallback(() => {
    //   if (currentStreamIndex < playlist.length - 1) {
      //     setCurrentStreamIndex(prevIndex => prevIndex + 1)
      //   } else {
        //     setCurrentStreamIndex(0)
        //   }
        // }, [currentStreamIndex])
        
        useEffect(() => {
    if (currentPlaying) {
      setVideoId(currentPlaying.extractedUrl);
      setIsPlaying(true);
      setVideoTitle(currentPlaying.title);
    }
  }, [currentPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: isPlaying ? "pauseVideo" : "playVideo",
        }),
        "*"
      );
    }
    onPlayPause();
  };

  const handleSkipForward = () => {
    nextSong();
  };

  return (
    <div className="bg-[#1DBBB4] rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="grid grid-cols-[1fr,2fr] gap-4">
        <div className="aspect-video rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&origin=${
              typeof window !== "undefined" ? window.location.origin : ""
            }`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-xl text-white mb-2 line-clamp-2">
              {videoTitle}
            </h3>
            {/* <p className="text-sm text-white/80">YouTube Player</p> */}
          </div>
          <div className="space-y-4">
            {/* <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div> */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-slate-700 hover:bg-slate-900 hover:text-white transition-colors duration-300"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
                  ) : (
                    <Play className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-slate-700 hover:bg-slate-900 hover:text-white transition-colors duration-300"
                  onClick={handleSkipForward}
                >
                  <SkipForward className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-slate-700 hover:bg-slate-900 hover:text-white transition-colors duration-300"
              >
                <Volume2 className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
