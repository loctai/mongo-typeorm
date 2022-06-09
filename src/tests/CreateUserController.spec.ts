import request from "supertest";

import { app } from "../app";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User";

describe("Create User Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.manager.clear(User)
      await AppDataSource.destroy();
    }
  });

  it("should be able to create a new user", async () => {

    const response = await request(app)
      .post("/user")
      .send({
        email: "joao@email.com",
        first_name: "Joao",
        last_name: "Costa",
        birthdate: "1992-06-03",
        gender: "F",
        phone: "(49) 96999-1141"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('created_at')
  });

  it("should not be able to create a new user with existent email", async () => {
    const user = {
      email: "joao@email.com",
      first_name: "Joao",
      last_name: "Costa",
      birthdate: "1992-06-03",
      gender: "F",
      phone: "(49) 96999-1141"
    }

    await request(app).post("/user").send(user)

    const response = await request(app).post("/user").send(user);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });


});
