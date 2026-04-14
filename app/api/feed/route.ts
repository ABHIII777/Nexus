import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const feedData = await db.query.posts.findMany({
        with: {
            author: true
        }
    })

    return NextResponse.json(feedData);
}