import { db } from "@/db"
import { posts } from "@/db/schema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json();

    const { content, authorId } = body;

    console.log(content, authorId);

    if (!content || !authorId) {
         return NextResponse.json({error: "Missing Fields"}, {status: 400});
    }

    try {
        await db.insert(posts).values({
            content,
            author: authorId 
        });

        return NextResponse.json({message: "Content Inserted"});
    } catch (err) {
        return NextResponse.json({error: "Content Already Exist"}, {status: 400});
    }
}
