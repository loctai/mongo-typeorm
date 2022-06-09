import { Repository } from "typeorm";

import { AppDataSource } from "../db/data-source";
import { UserMedicalHistory } from "../entities/UserMedicalHistory";
import { ICreateUserMedicalHistoryDTO } from "../DTOs/ICreateUserMedicalHistoryDTO";
import { IUserMedicalHistoryRepository } from "./IUserMedicalHistoryRepository";

class UserMedicalHistoryRepository implements IUserMedicalHistoryRepository{
  private repository: Repository<UserMedicalHistory>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserMedicalHistory);
  }

  async create(createUserMedicalHistory: ICreateUserMedicalHistoryDTO): Promise<UserMedicalHistory> {
    let medicalHistory = await this.findByUser(createUserMedicalHistory.user_id)

    if (!medicalHistory) {
      medicalHistory = new UserMedicalHistory()
    }

    Object.assign(medicalHistory, {
      ...createUserMedicalHistory
    })

    return this.repository.save(medicalHistory)
  }

  async findByUser(user_id: string): Promise<UserMedicalHistory> {
    return this.repository.findOneBy({ user_id });
  }
}

export { UserMedicalHistoryRepository };
