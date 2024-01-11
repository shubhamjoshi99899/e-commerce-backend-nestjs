import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class CartProduct {
  @Prop({ type: MongooseSchema.Types.String })
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  description: string;

  @Prop({ type: MongooseSchema.Types.Number })
  price: number;

  @Prop({ type: MongooseSchema.Types.Number })
  weight: number;

  @Prop({ type: MongooseSchema.Types.Number })
  quantity: number;

  @Prop({ type: MongooseSchema.Types.Number })
  productCode: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, select: false })
  _id: MongooseSchema.Types.ObjectId;
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: String })
  _id: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: [CartProductSchema], default: [] })
  products: CartProduct[];

  @Prop({ type: String, default: 'inactive' })
  status: string;

  @Prop({ type: Number })
  totalPrice: number;

  @Prop({ type: Number })
  totalQuantity: number;

  @Prop({ type: Number })
  totalWeight: number;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
