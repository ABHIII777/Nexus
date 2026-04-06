import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const userPosts = await db.select().from(posts);
    console.log(userPosts)

    return NextResponse.json(userPosts);
}