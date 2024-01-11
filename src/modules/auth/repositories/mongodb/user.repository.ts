import { Model } from 'mongoose';
import UserRepositoryInterface from '../user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  /**
   * fetch users
   */
  fetchUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * find by id
   */
  findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  /**
   * find by email id
   */
  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  /**
   * store a user
   */
  store(data: any): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  /**
   * update a user
   */
  async update(id: string, data: any): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedUser;
  }
}
