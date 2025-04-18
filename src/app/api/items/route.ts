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
    try {
        await connectMongoDB();
        const body = await request.json();
        const { lat, lng, colour, name, imageLink } = body;

        // Validate required fields
        if (!lat || !lng || !colour) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newItem = new Item({
            lat,
            lng,
            colour,
            name: name || "", // Default to an empty string if not provided
            imageLink: imageLink || "", // Default to an empty string if not provided
            userId: "test-user-id", // Temporary placeholder for userId
        });

        await newItem.save();
        return NextResponse.json(newItem, { status: 201 });
    } catch (e: any) {
        console.error("Error in POST /api/items:", e.stack || e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}