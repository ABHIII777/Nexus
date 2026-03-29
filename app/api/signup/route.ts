import bcrypt from "bcrypt";
import {db} from "@/db";
import {users} from "@/db/schema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json();

    const { name, email, password } = body;

    if(!name || !email || !password) {
         return NextResponse.json({error: "Missing Fields"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(users).values({
            name, email, password: hashedPassword
        });

        return NextResponse.json({message: "User Created"})

    } catch (err) {
        return NextResponse.json({message: "User Already Exist"}, {status: 400});
    }

}
