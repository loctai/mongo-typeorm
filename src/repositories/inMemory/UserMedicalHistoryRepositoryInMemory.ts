import { v4 as uuid } from 'uuid'

import { UserMedicalHistory } from "../../entities/UserMedicalHistory";
import { ICreateUserMedicalHistoryDTO } from "../../DTOs/ICreateUserMedicalHistoryDTO";
import { IUserMedicalHistoryRepository } from "../IUserMedicalHistoryRepository";

class UserMedicalHistoryRepositoryInMemory implements IUserMedicalHistoryRepository {
  private medicalHistories: UserMedicalHistory[] = []

  async create({
    user_id,
    height,
    weight,
    pregnant,
    illnesses
  }: ICreateUserMedicalHistoryDTO): Promise<UserMedicalHistory> {
    let medicalHistory = await this.findByUser(user_id)

    if (!medicalHistory) {
      medicalHistory = new UserMedicalHistory()
      Object.assign(medicalHistory, {
        id: uuid()
      })
    }

    Object.assign(medicalHistory, {
      user_id,
      height,
      weight,
      pregnant,
      illnesses
    })

    this.medicalHistories.push(medicalHistory)

    return medicalHistory
  }

  async findByUser(user_id: string): Promise<UserMedicalHistory> {
    return this.medicalHistories.find(medicalHistory => medicalHistory.user_id === user_id)
  }
}

export { UserMedicalHistoryRepositoryInMemory };
