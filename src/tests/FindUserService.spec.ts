import { ICreateUserDTO } from "../DTOs/ICreateUserDTO"
import { UserMedicalHistoryRepositoryInMemory } from "../repositories/inMemory/UserMedicalHistoryRepositoryInMemory"
import { UserRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory"
import { FindUserService } from "../services/FindUserService"
import { ListAllUsersService } from "../services/ListAllUsersService"

let medicalHistoryRepository: UserMedicalHistoryRepositoryInMemory
let userRepository: UserRepositoryInMemory
let service: FindUserService

describe("Find User", () => {

  beforeEach(async () => {
    medicalHistoryRepository = new UserMedicalHistoryRepositoryInMemory()
    userRepository = new UserRepositoryInMemory()
    service = new FindUserService(userRepository, medicalHistoryRepository)

    userRepository.create({
      email: "joao@email.com",
      first_name: "Joao",
      last_name: "Costa",
      birthdate: new Date("1992-06-03"),
      gender: "F",
      phone: "(49) 96999-1141"
    });

    const newUser = await userRepository.create({
      email: "rian@email.com",
      first_name: "Rian",
      last_name: "Silva",
      birthdate: new Date("1993-08-10"),
      gender: "F",
      phone: "(49) 96999-1141"
    })

    medicalHistoryRepository.create({
      user_id: String(newUser.id),
      height: 20,
      weight: 120,
      pregnant: true,
      illnesses: ['AIDS', 'Lepra']
    })
  })

  it('should be able to return an user with medical history', async () => {
    const emailToFind = 'rian@email.com'
    const user = await service.execute(emailToFind)

    expect(user).toBeTruthy();
    expect(user.email).toBe(emailToFind);
    expect(user.medicalHistory).toBeTruthy();
  })

  it('should be able to return an user without medical history', async () => {
    const emailToFind = 'joao@email.com'
    const user = await service.execute(emailToFind)

    expect(user).toBeTruthy();
    expect(user.email).toBe(emailToFind);
    expect(user.medicalHistory).toBeFalsy();
  })

  it('should not be able to return an user', async () => {
    const users = await service.execute('null@email.com')

    expect(users).toBeFalsy();
  })
})