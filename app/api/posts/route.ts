import { db } from "@/db"
import { posts } from "@/db/schema"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.json();

    const { content, authorId } = body;

    if (!content || !authorId) {
        return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    try {
        await db.insert(posts).values({
            content,
            author: authorId
        });

        return NextResponse.json({ message: "Content Inserted" });
    } catch (err) {
        return NextResponse.json({ error: "Content Already Exist" }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    const body = await req.json();

    const { id, content } = body;

    await db.update(posts).set({ content }).where(eq(posts.id, Number(id)));

    return NextResponse.json({ message: "Post Updated" });
}