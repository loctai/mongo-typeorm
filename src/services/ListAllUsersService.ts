import { inject, injectable } from "tsyringe";
import { IResponseUserDTO } from "../DTOs/IResponseUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
class ListAllUsersService {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(): Promise<IResponseUserDTO[]> {
    const users = await this.userRepository.findAll();

    const usersToReturn: IResponseUserDTO[] = users.map(user => {
      const fullname = `${user.first_name} ${user.last_name}`

      delete user.id
      delete user.first_name
      delete user.last_name
      delete user.phone

      return { ...user, fullname }
    })

    return usersToReturn
  }
}

export { ListAllUsersService };
