import { NextResponse } from "next/server";
import User from "../../../models/userSchema";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../config/mongodb";

interface UserRequestBody {
    username: string;
    email: string;
    password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    const { username, email, password }: UserRequestBody = await request.json();

    console.log(username, email, password);

    await connectMongoDB();
    const hashedPassword: string = await bcrypt.hash(password, 5);
    const newUser: UserRequestBody = {
        username,
        password: hashedPassword,
        email,
    };
    try {
        await User.create(newUser);
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }

    return new NextResponse("User has been created", {
        status: 201,
    });
}