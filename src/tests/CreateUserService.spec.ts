import { ICreateUserDTO } from "../DTOs/ICreateUserDTO"
import { AppError } from "../errors/AppError"
import { UserRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory"
import { CreateUserService } from "../services/CreateUserService"

let repository: UserRepositoryInMemory
let service: CreateUserService

describe("Create User", () => {

  beforeEach(async () => {
    repository = new UserRepositoryInMemory()
    service = new CreateUserService(repository)
  })  

  it('should be able to create a new user', async () => {
    const user: ICreateUserDTO = {
      email: "joao@email.com",
      first_name: "Joao",
      last_name: "Costa",
      birthdate: new Date("1992-06-03"),
      gender: "F",
      phone: "(49) 96999-1141"
    }

    const newUser = await service.execute(user)

    expect(newUser).toHaveProperty("id");
  })

  it('should not be able to create a new user with existent email', async () => {
    const user: ICreateUserDTO = {
      email: "joao@email.com",
      first_name: "Joao",
      last_name: "Costa",
      birthdate: new Date("1992-06-03"),
      gender: "F",
      phone: "(49) 96999-1141"
    }

    await service.execute(user)

    await expect(service.execute(user)).rejects.toEqual(
      new AppError("Email already exists")
    );
  })

})