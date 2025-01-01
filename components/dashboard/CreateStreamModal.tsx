'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {ToastContainer,toast} from 'react-toastify'
import createNeonInitialsImage from '@/lib/common/StringToImage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import axios from 'axios'
import GetCurrentUser from '../GetUser'
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }).max(50, {
    message: "Title must not exceed 50 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters.",
  }),
})


export function CreateStreamModal({ isOpen, onClose, onCreateStream }: CreateStreamModalProps) {
  const userId = GetCurrentUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const image = await createNeonInitialsImage(values.title);
    const res = await axios.post('/api/room', 
      {
        title: values.title,
        description: values.description,
        userId: userId,
        isActive: true,
        image: image
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    toast.success(res.data.message, {
      position: 'bottom-right',
      autoClose: 4000
    });
    sessionStorage.setItem('currentRoom', JSON.stringify(res.data.roomDetails))
    onCreateStream(values.title, values.description, image)
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white border border-white/10">
        <DialogHeader>
          <DialogTitle>Create New Stream</DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill in the details to create your new stream.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter stream title" 
                      {...field} 
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-[#FF6B2C]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter stream description" 
                      {...field} 
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-[#FF6B2C]" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-[#FF6B2C] hover:bg-[#FF6B2C]/90 text-white">
                Create Stream
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}

