import {db} from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const body = await req.json();

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

    return NextResponse.json({
        message: "Login Successfull",
        id: user.id,
        name: user.name
    });

}
