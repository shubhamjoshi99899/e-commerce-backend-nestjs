import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Status } from '../constants/status.enum';

@Schema()
export class Address {
  @Prop({ type: MongooseSchema.Types.String, default: null })
  house: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  street: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  city: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  state: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  zipCode: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: MongooseSchema.Types.String,
    index: true,
    required: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: MongooseSchema.Types.String,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Prop({
    type: MongooseSchema.Types.String,
  })
  password: string;

  @Prop({
    type: MongooseSchema.Types.Number,
  })
  phone: number;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  isAdmin: boolean;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  googleId: string;

  @Prop({ type: Address, default: null })
  address: Address;

  @Prop({ type: Types.ObjectId, ref: 'Cart', default: null })
  cartId: Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Purchase', default: [] })
  purchases: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
