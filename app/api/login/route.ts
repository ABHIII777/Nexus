import {db} from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { loginSchema } from "@/lib/validators";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if(!parsed.success) {
        return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
    }

    const {email, password} = body;

    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        return NextResponse.json({error: "Invalid Credentials"}, {status: 400});
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 400})
    }

    const token = signToken({userId: user.id});

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/"
    })

    return NextResponse.json({
        message: "Logged in !"
    });

}
