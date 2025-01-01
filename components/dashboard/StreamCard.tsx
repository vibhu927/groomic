"use client"
import { Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'



export function StreamCard({ title, host, listeners, thumbnail }: StreamCardProps) {
  console.log(thumbnail)
  return (
    <Card className="overflow-hidden bg-[#1DBBB4] hover:shadow-lg transition-shadow border-0">
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold truncate">{title}</h3>
          <p className="text-white/80 text-sm">Hosted by {host}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white" />
          <span className="text-sm text-white">{listeners} listening</span>
        </div>
        <Button variant="default" className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-slate-900">
          Join Room
        </Button>
      </div>
    </Card>
  )
}

