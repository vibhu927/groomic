import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
//@ts-ignore
import youtubesearchapi from 'youtube-search-api'
const streamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
  roomId: z.string()
});
const YOUTUBE_REGEX = new RegExp(
  "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/watch\\?v=([\\w\\-]+)"
);

export async function POST(req: NextRequest) {
  try {
    const data = streamSchema.parse(await req.json());
    console.log(data)
    const youtube = YOUTUBE_REGEX.test(data.url);
    if (!youtube) {
      return NextResponse.json(
        {
          message: "Wrong URL format 😒",
        },
        {
          status: 412,
        }
      );
    }
    const extractedId = data.url.split("?v=")[1];
    const videoData = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbNails = videoData.thumbnail.thumbnails;
    thumbNails.sort((a:{width:number}, b:{width:number}) => a.width < b.width ? -1 : 1);
    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedUrl: extractedId,
        type: "Youtube",
        upVotes: 0,
        title: videoData.title ?? "Title not found 😕",
        bigImg: thumbNails[thumbNails.length - 1].url ?? "",
        smallImg: thumbNails.length > 1 ? thumbNails[thumbNails.length - 2].url : thumbNails[thumbNails.length - 1].url ?? "",
        roomId: data.roomId ?? "",
        isEnded: false
      },
    });
    return NextResponse.json({
        message:"Stream Added successfully 😁",
        data: stream
    },{
        status: 200,
    })
  } catch (ex) {
    return NextResponse.json(
      {
        message: "Error while loading a stream 🫥",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where:{
            userId: creatorId ?? "",
        }
    });
    return NextResponse.json({streams});
}
