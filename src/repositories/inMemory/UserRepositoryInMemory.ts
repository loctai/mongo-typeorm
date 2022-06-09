import { v4 as uuid } from 'uuid'
import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create({
    email,
    first_name,
    last_name,
    gender,
    birthdate,
    phone
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      email,
      first_name,
      last_name,
      gender,
      birthdate,
      phone
    })

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findByID(id: string): Promise<User> {
    return this.users.find(user => String(user.id) === id)
  }

  async findAll(): Promise<User[]> {
    return this.users
  }

}

export { UserRepositoryInMemory };
