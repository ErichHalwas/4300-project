import mongoose, { Document, Schema, Model } from "mongoose";

export interface IItem extends Document {
    lat: number;
    lng: number;
    colour: string;
    name: string;
    imageLink: string;
  }
  
  const ItemSchema = new Schema<IItem>({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    colour: { type: String, required: true },
    name: { type: String, required: true },
    imageLink: { type: String, required: false },
  });
  const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
  export default Item;