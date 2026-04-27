import { db } from "@/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { posts } from "@/db/schema";

export async function POST(req: Request) {
    const body = await req.json();

    const { id, likes, repost } = body;

    try {
        await db.update(posts).set({likes}).where(eq(posts.id, Number(id)));
        await db.update(posts).set({reposts: repost}).where(eq(posts.id, Number(id)));
        
        return NextResponse.json({message: "Update successfull"}, {status: 200});
        
    } catch (err) {
        return NextResponse.json({error: err})
    }
}