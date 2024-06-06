import { Types as MongooseTypes } from 'mongoose';

export interface ProductAddedToCartEvent {
  userId: MongooseTypes.ObjectId;
  cartId: MongooseTypes.ObjectId;
}
