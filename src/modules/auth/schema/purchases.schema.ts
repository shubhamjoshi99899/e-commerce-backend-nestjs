import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Purchase extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Number })
  quantity: number;

  @Prop({ type: MongooseSchema.Types.Date })
  purchaseDate: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
