'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Copy, Share } from 'lucide-react'



export function ShareRoomModal({ isOpen, onClose, roomLink }: ShareRoomModalProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(roomLink)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white border border-white/10">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Share Room
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Share this link with your friends to invite them to your stream.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            value={roomLink}
            readOnly
            className="flex-1 bg-white/10 border-white/20 text-white"
          />
          <Button
            onClick={handleCopy}
            className="bg-[#1DBBB4] hover:bg-[#1DBBB4]/90 text-white"
          >
            {isCopied ? 'Copied!' : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter>
          <Button className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-slate-900">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

