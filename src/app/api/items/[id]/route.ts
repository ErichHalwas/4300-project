import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import Item from '../../../../models/itemSchema';
import { useSession } from 'next-auth/react';
import { authConfig, auth } from '../../../../auth.config'; 

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();

    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    try {
        const item = await Item.findById(id).lean();
        if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        const formattedItem = {
            _id: item._id.toString(),
            lat: item.lat,
            lng: item.lng,
            name: item.name,
            colour: item.colour,
            imageLink: item.imageLink || null,
            userId: item.userId || null,
        };
        return NextResponse.json(formattedItem, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching item by ID:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();

    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const userId = session.user.id;

    try {
        const item = await Item.findById(id);
        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        if (item.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await Item.findByIdAndDelete(id);
        return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting item:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();

    const body = await request.json();
    const { lat, lng, colour, title, imageLink } = body;
    const updatedItem = await Item.findByIdAndUpdate(
        {_id: params.id},
        {
        lat,
        lng,
        colour,
        name: title,
        imageLink,
    }, { new: true });
    return NextResponse.json(updatedItem);
}
// This code is for handling API requests related to items in a MongoDB database using Next.js.