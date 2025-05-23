import mongoose, { Document, Schema, Model } from "mongoose";

export interface IItem extends Document {
  lat: number;
  lng: number;
  colour: string;
  name: string;
  imageLink: string;
  userId: string; // Add userId to associate the marker with a user
}

const ItemSchema = new Schema<IItem>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  colour: { type: String, required: true },
  name: { type: String, required: true },
  imageLink: { type: String, required: false },
  userId: { type: String, required: true }, // New field
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
export default Item;