import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../auth.config";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectMongoDB();
    const items = await Item.find({});
    return NextResponse.json(items);
};

export async function POST(request: NextRequest) {
    await connectMongoDB();

    // Use getServerSession to get the session on the server
    const session = await getServerSession(authConfig);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { lat, lng, colour, title, imageLink } = body;

    const newItem = new Item({
        lat,
        lng,
        colour,
        name: title,
        imageLink,
        userId: session.user.id, // Associate the item with the authenticated user
    });

    try {
        await newItem.save();
        return NextResponse.json(newItem, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}