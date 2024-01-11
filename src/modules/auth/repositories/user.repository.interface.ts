import { User } from '../schema/user.schema';

export default interface UserRepositoryInterface {
  /**
   * fetch users
   */
  fetchUsers(): Promise<User[]>;

  /**
   * find by id
   */
  findById(id: string): Promise<User>;

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
  update(id: string, data: any): Promise<User>;
}
