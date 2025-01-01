import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'

const roomSchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string(),
  isActive: z.boolean(),
  image: z.string()
});
export async function POST(req: NextRequest){
    try{
    const data = roomSchema.parse(await req.json());
    
    const res = await prismaClient.room.create({
        data:{
            name: data.title,
            description: data.description,
            userId: data.userId,
            isActive: data.isActive,
            image: data.image 
        }
    })
    return NextResponse.json({
        message:'Room created successfully 😁',
        roomDetails: res
    },{
        status: 200
    });
   }
   catch(ex){
    return NextResponse.json(
        {
          message: "Error while creating a room 🫥",
        },
        {
          status: 412,
        }
      );
   }
}

export async function PUT(req: NextRequest){
    try{
        const data = roomSchema.parse(await req.json());
        const res = await prismaClient.room.findFirst({
            where:{
                userId: data.userId
            }
        })
        return res;
       }
       catch(ex){
        return NextResponse.json(
            {
              message: "Error while creating a room 🫥",
            },
            {
              status: 411,
            }
          );
       }
}