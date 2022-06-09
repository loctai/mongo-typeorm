import request from "supertest";

import { app } from "../app";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User";
import { UserMedicalHistory } from "../entities/UserMedicalHistory";

let user_id: string

describe("Create Medical History Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()

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

    user_id = response.body.id
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.manager.clear(UserMedicalHistory)
      await AppDataSource.manager.clear(User)
      await AppDataSource.destroy();
    }
  });

  it("should be able to create a new medical history", async () => {

    const response = await request(app)
      .post(`/user/${user_id}/medical-history`)
      .send({
        illnesses: ["illness 1", "illness 10"],
        height: 181,
        weight: 94.0,
        pregnant: false
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('user_id')
    expect(response.body).toHaveProperty('created_at')
  });

  it("should not be able to create a new medical history without user", async () => {
    const response = await request(app)
      .post(`/user/invalid_ID/medical-history`)
      .send({
        illnesses: ["illness 1", "illness 10"],
        height: 181,
        weight: 94.0,
        pregnant: false
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User does not exists');
  });


});
