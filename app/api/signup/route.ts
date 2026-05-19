import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema"
import { NextResponse } from "next/server"
import { loginSchema, signupSchema } from "@/lib/validators";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {

    const body = await req.json();

    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { email, password, name } = parsed.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await db.insert(users).values({
            email, password: hashedPassword, name
        }).returning()

        const token = signToken({ userId: user[0].id });

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/"
        })

        return NextResponse.json({ message: "User Created" })

    } catch (err) {
        return NextResponse.json({ message: "User Already Exist" }, { status: 400 });
    }

}
