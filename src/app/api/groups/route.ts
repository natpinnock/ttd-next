import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: NextRequest) {
  const groups = await prisma.group.findMany();
  console.log(groups);
  return new Response(JSON.stringify(groups));
}
