import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const userPosts = await db.select().from(posts);
    console.log(userPosts)

    const feedData = await db.query.posts.findMany({
        with: {
            author: true
        }
    })

    console.log(feedData);

    // return NextResponse.json(userPosts);
    return NextResponse.json(feedData);
}