import { ICreateUserDTO } from "../DTOs/ICreateUserDTO"
import { UserRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory"
import { ListAllUsersService } from "../services/ListAllUsersService"

let repository: UserRepositoryInMemory
let service: ListAllUsersService

describe("List All Users", () => {

  beforeEach(async () => {
    repository = new UserRepositoryInMemory()
    service = new ListAllUsersService(repository)
  })

  it('should be able to list all users', async () => {
    repository.create({
      email: "joao@email.com",
      first_name: "Joao",
      last_name: "Costa",
      birthdate: new Date("1992-06-03"),
      gender: "F",
      phone: "(49) 96999-1141"
    })

    repository.create({
      email: "rian@email.com",
      first_name: "Rian",
      last_name: "Silva",
      birthdate: new Date("1993-08-10"),
      gender: "F",
      phone: "(49) 96999-1141"
    })

    repository.create({
      email: "magro@email.com",
      first_name: "Magro",
      last_name: "Neves",
      birthdate: new Date("1990-06-01"),
      gender: "F",
      phone: "(49) 96999-1141"
    })

    const users = await service.execute()

    expect(users.length).toBe(3);
  })

  it('should be able to return an empty list of users', async () => {
    const users = await service.execute()

    expect(users.length).toBe(0);
  })
})