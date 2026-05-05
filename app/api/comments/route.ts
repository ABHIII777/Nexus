import { db } from "@/db";
import { comments } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.json()
    const { userId, postId, content } = body;

    try {
        await db.insert(comments).values({
            userId,
            postId,
            content
        });

        return NextResponse.json({ message: "Comment content added."})
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    try {
        const data = await db.query.comments.findMany({
            where: (comments, { eq }) => eq(comments.postId, postId),
            with: {
                user: true
            }
        });

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}
