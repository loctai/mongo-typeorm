import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";
import { IUserMedicalHistoryRepository } from "../repositories/IUserMedicalHistoryRepository";

@injectable()
class FindUserService {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserMedicalHistoryRepository")
    private userMedicalHistoryRepository: IUserMedicalHistoryRepository
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      user.medicalHistory = await this.userMedicalHistoryRepository.findByUser(String(user.id));
    }

    return user;
  }
}

export { FindUserService };
