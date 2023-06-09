import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const lessons = await prisma.lesson.findMany({
    where: {
      userId,
    },
  });
  return new Response(JSON.stringify(lessons));
}

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { title, dateTime, groupName, lessonPlan, groupId } =
    await request.json();
  const lesson = await prisma.lesson.create({
    data: {
      id: uuidv4(),
      userId,
      groupId,
      groupName,
      title,
      dateTime,
      lessonPlan,
    },
  });

  return new Response(JSON.stringify(lesson));
}

export async function DELETE(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await request.json();
  const lesson = await prisma.lesson.delete({
    where: {
      id,
    },
  });
  return new Response(JSON.stringify(lesson));
}

export async function PATCH(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, title, dateTime, groupName, lessonPlan, groupId } =
    await request.json();
  const lesson = await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      title,
      dateTime,
      groupName,
      lessonPlan,
      groupId,
    },
  });
  return new Response(JSON.stringify(lesson));
}
