import { inject, injectable } from "tsyringe";
import { ICreateUserMedicalHistoryDTO } from "../DTOs/ICreateUserMedicalHistoryDTO";
import { UserMedicalHistory } from "../entities/UserMedicalHistory";
import { AppError } from "../errors/AppError";
import { IUserMedicalHistoryRepository } from "../repositories/IUserMedicalHistoryRepository";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
class CreateUserMedicalHistoryService {

  constructor(
    @inject("UserMedicalHistoryRepository")
    private userMedicalHistoryRepository: IUserMedicalHistoryRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({
    user_id,
    height,
    weight,
    pregnant,
    illnesses
  }: ICreateUserMedicalHistoryDTO): Promise<UserMedicalHistory> {
    const user = await this.userRepository.findByID(user_id)

    if (!user) {
      throw new AppError("User does not exists");
    }

    return this.userMedicalHistoryRepository.create({
      user_id,
      height,
      weight,
      pregnant,
      illnesses
    });
  }
}

export { CreateUserMedicalHistoryService };
