import { ICreateUserMedicalHistoryDTO } from "../DTOs/ICreateUserMedicalHistoryDTO"
import { AppError } from "../errors/AppError"
import { UserMedicalHistoryRepositoryInMemory } from "../repositories/inMemory/UserMedicalHistoryRepositoryInMemory"
import { UserRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory"
import { CreateUserMedicalHistoryService } from "../services/CreateUserMedicalHistoryService"

let userRepository: UserRepositoryInMemory
let medicalHistoryRepository: UserMedicalHistoryRepositoryInMemory
let service: CreateUserMedicalHistoryService

let user_id: string

describe("Create User Medical History", () => {

  beforeEach(async () => {
    medicalHistoryRepository = new UserMedicalHistoryRepositoryInMemory()
    userRepository = new UserRepositoryInMemory()
    service = new CreateUserMedicalHistoryService(medicalHistoryRepository, userRepository)

    const user = await userRepository.create({
      email: "joao@email.com",
      first_name: "Joao",
      last_name: "Costa",
      birthdate: new Date("1992-06-03"),
      gender: "F",
      phone: "(49) 96999-1141"
    })

    user_id = String(user.id)
  })

  it('should be able to create a new medical history', async () => {
    const medicalHistory: ICreateUserMedicalHistoryDTO = {
      user_id,
      height: 20,
      weight: 120,
      pregnant: true,
      illnesses: ['AIDS', 'Lepra']
    }

    const newMedicalHistory = await service.execute(medicalHistory)

    expect(newMedicalHistory).toHaveProperty("id");
  })

  it('should be able to replace an existent medical history', async () => {
    const medicalHistory: ICreateUserMedicalHistoryDTO = {
      user_id,
      height: 20,
      weight: 120,
      pregnant: true,
      illnesses: ['AIDS', 'Lepra']
    }

    let firstMedicalHistory = await service.execute(medicalHistory)

    await service.execute({
      user_id,
      height: 190,
      weight: 85,
      pregnant: true,
      illnesses: ['Carapato']
    })

    const updatedMedicalHistory = await medicalHistoryRepository.findByUser(user_id)

    expect(firstMedicalHistory.id).toBe(updatedMedicalHistory.id);
    expect(firstMedicalHistory.user_id).toBe(updatedMedicalHistory.user_id);
    expect(updatedMedicalHistory.height).toBe(190)
    expect(updatedMedicalHistory.weight).toBe(85)
    expect(updatedMedicalHistory.illnesses.length).toBe(1)
    expect(updatedMedicalHistory.illnesses[0]).toBe("Carapato")
  })

  it('should not be able to create a new medical history with a non existent user_id', async () => {
    const medicalHistory: ICreateUserMedicalHistoryDTO = {
      user_id: '23123123123',
      height: 20,
      weight: 120,
      pregnant: true,
      illnesses: ['AIDS', 'Lepra']
    }

    await expect(service.execute(medicalHistory)).rejects.toEqual(
      new AppError("User does not exists")
    );
  })

})