import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  code: string;

  @Prop({ type: MongooseSchema.Types.String })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
