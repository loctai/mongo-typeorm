import request from "supertest";

import { app } from "../app";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User";
import { UserMedicalHistory } from "../entities/UserMedicalHistory";

let user: User

describe("Find User Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()

    let response = await request(app)
      .post("/user")
      .send({
        email: "joao@email.com",
        first_name: "Joao",
        last_name: "Costa",
        birthdate: "1990-07-10",
        gender: "F",
        phone: "(49) 96999-4554"
      });

    user = response.body

    response = await request(app)
      .post(`/user/${user.id}/medical-history`)
      .send({
        illnesses: ["illness 1", "illness 10"],
        height: 181,
        weight: 94.0,
        pregnant: false
      });

    user.medicalHistory = response.body

    response = await request(app)
      .post("/user")
      .send({
        email: "rian@email.com",
        first_name: "Rian",
        last_name: "Perassoli",
        birthdate: "1992-06-03",
        gender: "M",
        phone: "(49) 96999-8788"
      });

    await request(app)
      .post(`/user/${response.body.id}/medical-history`)
      .send({
        illnesses: ["illness 1", "illness 10"],
        height: 181,
        weight: 94.0,
        pregnant: false
      });
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.manager.clear(UserMedicalHistory)
      await AppDataSource.manager.clear(User)
      await AppDataSource.destroy();
    }
  });

  it("should be able to list an user", async () => {
    const response = await request(app).get(`/user/${user.email}`)

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("should not be able to list an user without email stored", async () => {
    const response = await request(app).get(`/user/${user.email}asd`)

    expect(response.status).toBe(200);
    expect(response.body).toBe(null)
  });

});
