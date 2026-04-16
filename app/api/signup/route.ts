import bcrypt from "bcrypt";
import {db} from "@/db";
import {users} from "@/db/schema"
import { NextResponse } from "next/server"
import { loginSchema, signupSchema } from "@/lib/validators";

export async function POST(req: Request) {

    const body = await req.json();

    const parsed = signupSchema.safeParse(body);

    if(!parsed.success) {
        return NextResponse.json({error: parsed.error}, { status: 400});
    }

    const { email, password, name } = parsed.data;

    if(!name || !email || !password) {
         return NextResponse.json({error: "Missing Fields"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(users).values({
            email, password: hashedPassword, name
        })

        return NextResponse.json({message: "User Created"})

    } catch (err) {
        return NextResponse.json({message: "User Already Exist"}, {status: 400});
    }

}
