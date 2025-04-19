import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import Item from '../../../../models/itemSchema';
import { useSession } from 'next-auth/react';
import { authConfig } from '../../../../auth.config'; 

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();
    const item = await Item.findById(params.id);
    return NextResponse.json(item);
};

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();
    const item = await Item.findByIdAndDelete(params.id);
    return NextResponse.json(item);
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