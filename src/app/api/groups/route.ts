import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const groups = await prisma.group.findMany();
  return new Response(JSON.stringify(groups));
}

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { groupName, numberOfStudents, notes } = await request.json();
  const group = await prisma.group.create({
    data: {
      id: uuidv4(),
      userId,
      groupName,
      numberOfStudents,
      notes,
    },
  });

  return new Response(JSON.stringify(group));
}
