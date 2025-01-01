import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const downVoteSchema = z.object({
  streamId: z.string(),
});
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "You are Unauthorized 😏",
      },
      {
        status: 403,
      }
    );
  }
  try {
    const data = downVoteSchema.parse(await req.json());
    await prismaClient.upVote.delete({
      where: {
        streamId_userId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while upvoting 🫥",
      },
      {
        status: 411,
      }
    );
  }
}
