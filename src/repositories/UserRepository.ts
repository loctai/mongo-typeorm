import { ObjectID, Repository } from "typeorm";

import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";

import { User } from "../entities/User";
import { AppDataSource } from "../db/data-source";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(User);
  }

  async create(createUser: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      ...createUser
    })

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async findByID(id: string): Promise<User> {
    const users = await this.findAll()

    return users.find(user => String(user.id) === id)
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}

export { UserRepository };
