import { User } from '../schema/user.schema';
import { Types as MongooseTypes } from 'mongoose';
export default interface UserRepositoryInterface {
  /**
   * fetch users
   */
  fetchUsers(): Promise<User[]>;

  /**
   * find by id
   */
  findById(id: MongooseTypes.ObjectId): Promise<User>;

  /**
   * find by email id
   */
  findByEmail(email: string): Promise<User>;

  /**
   * store a user
   */
  store(data: any): Promise<User>;

  /**
   * update a user
   */
  update(id: MongooseTypes.ObjectId, data: any): Promise<User>;
}
