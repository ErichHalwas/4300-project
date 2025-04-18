import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";
import { authConfig } from "../../../auth.config";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const items = await Item.find({});
    return NextResponse.json(items);
};

export async function POST(request: NextRequest) {
    await connectMongoDB();
    const body = await request.json();
    const { lat, lng, colour, title, imageLink } = body;

    const newItem = new Item({
        lat,
        lng,
        colour,
        name: title,
        imageLink,
    });

    try {
        await newItem.save();
        return NextResponse.json(newItem, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}