import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types as MongooseTypes } from 'mongoose';

@Schema({ _id: false })
export class CartProduct {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: MongooseTypes.ObjectId;

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
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);

@Schema({ _id: true, timestamps: true })
export class Cart {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  userId: MongooseTypes.ObjectId;

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

export type CartDocument = Cart;
export const CartSchema = SchemaFactory.createForClass(Cart);
