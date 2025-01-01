import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
 const session = await getServerSession();
 const roomId = req.nextUrl.searchParams.get("roomId");
    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    })
    if(!user){
        return NextResponse.json({
            message:"You are Unauthorized 😏"
        },{
            status: 403
        })
    };
    const streams = await prismaClient.stream.findMany({
        where:{
            roomId: roomId  ?? "",
        },
        include:{
            _count:{
                select:{
                    upvotes:true
                }
            },
            upvotes:{
                where:{
                    userId: user.id,
                }
            }
        }
    });
    return NextResponse.json({streams: streams.map(({_count, ...rest})=>({
        ...rest,
        upVoteCount: _count.upvotes,
        isUpvotes: rest.upVotes ? true : false
    }))});
}