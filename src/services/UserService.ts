import { Service } from 'typedi';
import { ValidationError } from '../errors';
import { User } from '../models';
import { CreateUserRequest } from '../types';

@Service()
export class UserService {
  public async getAll(): Promise<User[]> {
    return User.findAll();
  }

  public async getOne(id: number): Promise<User> {
    return User.findByPk(id);
  }

  public async create(params: CreateUserRequest): Promise<User> {
    if (!params.age || !params.location || !params.name) {
      throw new ValidationError('Age, location, and name are required.');
    }

    return User.create({
      age: params.age,
      location: params.location,
      name: params.name,
    });
  }
}
