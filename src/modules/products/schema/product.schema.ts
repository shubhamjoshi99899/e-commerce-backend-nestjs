import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    type: MongooseSchema.Types.String,
    index: true,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    index: true,
    required: true,
  })
  description: string;

  @Prop({
    type: MongooseSchema.Types.Number,
    index: true,
    required: true,
  })
  price: number;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
  })
  weight: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    type: MongooseSchema.Types.Number,
  })
  units: number;

  @Prop({ type: MongooseSchema.Types.String, required: false })
  images?: string;

  @Prop({ type: MongooseSchema.Types.Number })
  productCode: number;
  quantity: any;
}
// export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
