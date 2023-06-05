import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const groups = await prisma.group.findMany({
    where: {
      userId,
    },
  });
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

export async function DELETE(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await request.json();
  const group = await prisma.group.delete({
    where: {
      id,
    },
  });
  return new Response(JSON.stringify(group));
}

export async function PATCH(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, groupName, numberOfStudents, notes } = await request.json();
  const group = await prisma.group.update({
    where: {
      id,
    },
    data: {
      groupName,
      numberOfStudents,
      notes,
    },
  });
  return new Response(JSON.stringify(group));
}
