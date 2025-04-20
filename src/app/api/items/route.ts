import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";
import { auth } from "../../../auth.config"
import { authConfig } from "../../../auth.config";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const items = await Item.find({}).lean();
    const formattedItems = items.map(item => ({
        _id: item._id.toString(), // Convert ObjectId to string
        lat: item.lat,
        lng: item.lng,
        name: item.name,
        colour: item.colour,
        imageLink: item.imageLink,
      }));
    return NextResponse.json(formattedItems, { status: 200 });
};

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();

        // Check if the user is authenticated
        const session = await auth();
        if (!session || !session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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
            name: name || "",
            imageLink: imageLink || "",
            userId: session.user.id, // Associate the item with the authenticated user
        });

        await newItem.save();
        return NextResponse.json(newItem, { status: 201 });
    } catch (e: any) {
        console.error("Error in POST /api/items:", e.stack || e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}