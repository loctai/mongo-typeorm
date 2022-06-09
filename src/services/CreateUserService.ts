import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
class CreateUserService {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    id,
    email,
    first_name,
    last_name,
    gender,
    birthdate,
    phone
  }: ICreateUserDTO): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email already exists')
    }

    return this.userRepository.create({
      id,
      email,
      first_name,
      last_name,
      gender,
      birthdate,
      phone
    });
  }
}

export { CreateUserService };
