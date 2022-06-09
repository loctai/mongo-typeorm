import { ObjectID } from "typeorm";
import { ICreateUserMedicalHistoryDTO } from "../DTOs/ICreateUserMedicalHistoryDTO";
import { UserMedicalHistory } from "../entities/UserMedicalHistory";

interface IUserMedicalHistoryRepository {
  create(data: ICreateUserMedicalHistoryDTO): Promise<UserMedicalHistory>
  findByUser(user_id: string): Promise<UserMedicalHistory>
}

export { IUserMedicalHistoryRepository };
